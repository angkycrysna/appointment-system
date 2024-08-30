import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SlotService } from './services/slot.service'
import { Slot } from './entities/slot.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Slot])],
	providers: [SlotService],
	exports: [SlotService],
})
export class SlotModule {}
