import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Config } from './entities/config.entity'
import { ConfigService } from './services/config.service'

@Module({
	imports: [TypeOrmModule.forFeature([Config])],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
