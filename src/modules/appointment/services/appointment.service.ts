import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Appointment } from '../entities/appointment.entity'
import { SlotService } from '../../slot/services/slot.service'
import { CreateAppointmentDto } from '../../../dtos/appointments/create-appointment.dto'
import { ConfigService } from '../../config/services/config.service'

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private appointmentRepository: Repository<Appointment>,
		private slotService: SlotService,
		private configService: ConfigService,
	) {}

	/**
	 * Retrieves available slots for a given date
	 * @param date The date to check for available slots
	 * @returns An array of available slots with date, time, and number of available slots
	 * Time Complexity: O(n), where n is the number of slots returned by getAvailableSlots
	 */
	async getAvailableSlots(date: string) {
		const operationalStartTime = await this.configService.get('operationalStartTime')
		const operationalEndTime = await this.configService.get('operationalEndTime')
		const slotDuration = await this.configService.get('slotDuration')
		const operationalDays = await this.configService.get('operationalDays')

		const slots = await this.slotService.getAvailableSlots(
			date,
			operationalStartTime,
			operationalEndTime,
			slotDuration,
			operationalDays,
		)
		return slots.map((slot) => ({
			date,
			time: slot.time,
			available_slots: slot.availableSlots,
		}))
	}

	/**
	 * Creates a new appointment
	 * @param createAppointmentDto The DTO containing appointment details
	 * @returns The created appointment
	 * @throws Error if the slot is not available or if there are not enough available slots
	 * Time Complexity: O(1), assuming constant time for database operations
	 */
	async createAppointment(createAppointmentDto: CreateAppointmentDto) {
		// Validate input
		if (!createAppointmentDto.date || !createAppointmentDto.time) {
			throw new Error('Date and time are required');
		}

		const appointmentDate = new Date(createAppointmentDto.date);
		const appointmentTime = createAppointmentDto.time;

		// Validate date format
		if (isNaN(appointmentDate.getTime())) throw new Error('Invalid date format');

		// Validate time format
		const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
		if (!timeRegex.test(appointmentTime)) throw new Error('Invalid time format. Use HH:MM');

		// Check if the appointment date is in the future
		const currentDate = new Date();
		if (appointmentDate < currentDate) throw new Error('Appointment date must be in the future');

		// Check for day off
		const daysOff = await this.configService.getDaysOff(appointmentDate, appointmentDate);
		if (daysOff.length > 0) throw new Error('Cannot create appointment on a day off');

		// Check for unavailable hours
		const unavailableHours = await this.configService.getUnavailableHours(appointmentDate.getDay());
		const isUnavailable = unavailableHours.some(uh => {
			const appointmentDateTime = new Date(`${createAppointmentDto.date}T${appointmentTime}`);
			const startTime = new Date(`${createAppointmentDto.date}T${uh.startTime}`);
			const endTime = new Date(`${createAppointmentDto.date}T${uh.endTime}`);
			return appointmentDateTime >= startTime && appointmentDateTime < endTime;
		});
		if (isUnavailable) throw new Error('Cannot create appointment during unavailable hours');

		const maxSlotsPerAppointment = await this.configService.get('maxSlotsPerAppointment')
		const slot = await this.slotService.getSlot(createAppointmentDto.date, createAppointmentDto.time)

		if (!slot) throw new Error('Slot is not available, please generate slots first')

		if (slot.availableSlots === 0) throw new Error('No available slots for this appointment')

		const appointment = new Appointment()
		appointment.date = new Date(`${createAppointmentDto.date}T${createAppointmentDto.time}`)
		appointment.slot = slot

		await this.slotService.decrementAvailableSlots(slot, maxSlotsPerAppointment)
		return this.appointmentRepository.save(appointment)
	}

	/**
	 * Cancels an existing appointment
	 * @param id The ID of the appointment to cancel
	 * @throws NotFoundException if the appointment is not found
	 * Time Complexity: O(1), assuming constant time for database operations
	 */
	async cancelAppointment(id: number): Promise<void> {
		const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['slot'] });
		if (!appointment) {
		  throw new NotFoundException('Appointment not found');
		}
	
		await this.slotService.incrementAvailableSlots(appointment.slot);
		await this.appointmentRepository.remove(appointment);
	  }
}