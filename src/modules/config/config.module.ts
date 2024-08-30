import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Config } from './entities/config.entity'
import { ConfigService } from './services/config.service'
import { DayOff } from './entities/day-off.entity'
import { UnavailableHour } from './entities/unavailable-hour.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Config, DayOff, UnavailableHour])],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
