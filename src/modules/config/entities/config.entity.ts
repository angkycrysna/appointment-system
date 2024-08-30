import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Config {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	key: string

	@Column('json')
	value: any
}
