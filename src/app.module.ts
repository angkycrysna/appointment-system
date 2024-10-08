import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppointmentModule } from './modules/appointment/appointment.module'
import { SlotModule } from './modules/slot/slot.module'
import { DatabaseModule } from './database/database.module'
import configuration from './config/configuration'
import { InitializationModule } from './modules/initialization/initialization.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
			isGlobal: true,
			load: [configuration],
		}),
		DatabaseModule,
		AppointmentModule,
		SlotModule,
		InitializationModule
	],
})
export class AppModule {}
