import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UnavailableHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  description: string;
}
