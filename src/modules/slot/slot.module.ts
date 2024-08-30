import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SlotService } from './services/slot.service'
import { Slot } from './entities/slot.entity'
import { ConfigModule } from '../config/config.module'

@Module({
	imports: [TypeOrmModule.forFeature([Slot]), ConfigModule],
	providers: [SlotService],
	exports: [SlotService],
})
export class SlotModule {}
