import { config } from 'dotenv'
import { resolve } from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const envFile = resolve(__dirname, `../.env.${process.env.NODE_ENV || 'dev'}`)
config({ path: envFile })

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const globalPrefix = 'api'
	app.setGlobalPrefix(globalPrefix)

	app.useGlobalPipes(new ValidationPipe())

	const configService = app.get(ConfigService)
	const port = configService.get('port')

	app.enableCors()
	await app.listen(port)

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}
bootstrap()
