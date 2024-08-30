import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				username: configService.get('database.username'),
				password: configService.get('database.password'),
				database: configService.get('database.name'),
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: configService.get('database.synchronize'),
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
