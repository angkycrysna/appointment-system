import { Slot } from 'src/modules/slot/entities/slot.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'timestamp' })
	date: Date

	@ManyToOne(() => Slot)
	@JoinColumn()
	slot: Slot
}
