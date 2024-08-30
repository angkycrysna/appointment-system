import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DayOff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  description: string;
}
