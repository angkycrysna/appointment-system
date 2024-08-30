import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentController } from './controllers/appointment.controller'
import { AppointmentService } from './services/appointment.service'
import { Appointment } from './entities/appointment.entity'
import { SlotModule } from '../slot/slot.module'
import { ConfigModule } from '../config/config.module'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment]), SlotModule, ConfigModule],
	controllers: [AppointmentController],
	providers: [AppointmentService],
})
export class AppointmentModule {}
