import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Slot {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'date' })
	date: Date;

	@Column({ type: 'time' })
	time: string

	@Column()
	availableSlots: number
}
