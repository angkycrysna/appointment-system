import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between } from 'typeorm'
import { Slot } from '../entities/slot.entity'

@Injectable()
export class SlotService {
	constructor(
		@InjectRepository(Slot)
		private slotRepository: Repository<Slot>,
	) {}

	/**
	 * Get available slots based on date, start time, end time, duration, and operational days.
	 * If no slots are available, new slots will be created.
	 * Time complexity: O(n) where n is the number of slots found or created.
	 */
	async getAvailableSlots(
		date: string,
		startTime: string,
		endTime: string,
		duration: number,
		operationalDays: number[],
	): Promise<Slot[]> {
		const selectedDate = new Date(date)
		if (!operationalDays.includes(selectedDate.getDay())) {
			return []
		}

		const slots = await this.slotRepository.find({
			where: {
				time: Between(startTime, endTime),
			},
			order: {
				time: 'ASC',
			},
		})

		if (slots.length === 0) {
			const generatedSlots = this.generateSlots(startTime, endTime, duration)
			await this.slotRepository.save(generatedSlots)
			return generatedSlots
		}

		return slots
	}

	/**
	 * Get a slot based on date and time.
	 * Time complexity: O(1) as it uses the findOne method from the repository.
	 */
	async getSlot(date: string, time: string): Promise<Slot> {
		return this.slotRepository.findOne({ where: { time } })
	}

	/**
	 * Decrease the number of available slots.
	 * Time complexity: O(1) for subtraction and saving operations.
	 */
	async decrementAvailableSlots(slot: Slot, amount: number): Promise<void> {
		slot.availableSlots -= amount
		await this.slotRepository.save(slot)
	}

	/**
	 * Increase the number of available slots.
	 * Time complexity: O(1) for addition and saving operations.
	 */
	async incrementAvailableSlots(slot: Slot): Promise<void> {
		slot.availableSlots++;
		await this.slotRepository.save(slot);

	}

	/**
	 * Create new slots based on start time, end time, and duration.
	 * Time complexity: O(n) where n is the number of slots created.
	 */
	private generateSlots(startTime: string, endTime: string, duration: number): Slot[] {
		const slots: Slot[] = []
		const currentTime = new Date(`1970-01-01T${startTime}`)
		const endDateTime = new Date(`1970-01-01T${endTime}`)

		while (currentTime < endDateTime) {
			const slot = new Slot()
			slot.time = currentTime.toTimeString().slice(0, 5)
			slot.availableSlots = 1
			slots.push(slot)

			currentTime.setMinutes(currentTime.getMinutes() + duration)
		}

		return slots
	}
}