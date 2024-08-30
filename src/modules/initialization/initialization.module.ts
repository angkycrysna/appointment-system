import { Module } from '@nestjs/common'
import { ConfigService } from '../config/services/config.service';
import { InitializationService } from './initialization.service';
import { ConfigModule } from '@nestjs/config';
import { Config } from '../config/entities/config.entity';
import { DayOff } from '../config/entities/day-off.entity';
import { UnavailableHour } from '../config/entities/unavailable-hour.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Config, DayOff, UnavailableHour]) ,ConfigModule],
	providers: [ConfigService, InitializationService],
	exports: [InitializationService],
})
export class InitializationModule {}
