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

	async getSlot(date: string, time: string): Promise<Slot> {
		return this.slotRepository.findOne({ where: { time } })
	}

	async decrementAvailableSlots(slot: Slot, amount: number): Promise<void> {
		slot.availableSlots -= amount
		await this.slotRepository.save(slot)
	}

	async incrementAvailableSlots(slot: Slot): Promise<void> {
		slot.availableSlots++;
		await this.slotRepository.save(slot);
	  }

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
