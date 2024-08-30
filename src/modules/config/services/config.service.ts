import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Config } from '../entities/config.entity'

@Injectable()
export class ConfigService {
	constructor(
		@InjectRepository(Config)
		private configRepository: Repository<Config>,
	) {}

	async get(key: string): Promise<any> {
		const config = await this.configRepository.findOne({ where: { key } })
		return config ? config.value : null
	}

	async set(key: string, value: any): Promise<void> {
		let config = await this.configRepository.findOne({ where: { key } })
		if (!config) {
			config = new Config()
			config.key = key
		}
		config.value = value
		await this.configRepository.save(config)
	}
}
