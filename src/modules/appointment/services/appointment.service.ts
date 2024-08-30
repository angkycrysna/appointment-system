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

	async createAppointment(createAppointmentDto: CreateAppointmentDto) {
		const maxSlotsPerAppointment = await this.configService.get('maxSlotsPerAppointment')
		const slot = await this.slotService.getSlot(createAppointmentDto.date, createAppointmentDto.time)

		if (!slot || slot.availableSlots === 0) {
			throw new Error('Slot is not available')
		}

		if (slot.availableSlots < maxSlotsPerAppointment) {
			throw new Error('Not enough available slots for this appointment')
		}

		const appointment = new Appointment()
		appointment.date = new Date(`${createAppointmentDto.date}T${createAppointmentDto.time}`)
		appointment.slot = slot

		await this.slotService.decrementAvailableSlots(slot, maxSlotsPerAppointment)
		return this.appointmentRepository.save(appointment)
	}

	async cancelAppointment(id: number): Promise<void> {
		const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['slot'] });
		if (!appointment) {
		  throw new NotFoundException('Appointment not found');
		}
	
		await this.slotService.incrementAvailableSlots(appointment.slot);
		await this.appointmentRepository.remove(appointment);
	  }
}
