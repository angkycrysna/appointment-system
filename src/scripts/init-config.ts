import { createConnection } from 'typeorm'
import { Config } from '../modules/config/entities/config.entity'

async function initConfig() {
	const connection = await createConnection()
	const configRepository = connection.getRepository(Config)

	const configs = [
		{ key: 'slotDuration', value: 30 },
		{ key: 'maxSlotsPerAppointment', value: 5 },
		{ key: 'operationalStartTime', value: '09:00' },
		{ key: 'operationalEndTime', value: '18:00' },
		{ key: 'operationalDays', value: [1, 2, 3, 4, 5] },
	]

	for (const config of configs) {
		await configRepository.save(config)
	}

	await connection.close()
}

initConfig().catch(console.error)
