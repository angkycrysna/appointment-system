import { Module } from '@nestjs/common'
import { InitializationService } from './initialization.service';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [ConfigModule],
	providers: [InitializationService],
	exports: [InitializationService],
})
export class InitializationModule {}
