import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/services/config.service';

@Injectable()
export class InitializationService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeConfig();
  }

  /**
   * Initializes the configuration by setting default values for various settings.
   * This method checks if each configuration exists, and if not, sets the default value.
   * 
   * Time Complexity: O(n), where n is the number of configuration items.
   * - The method iterates through each config item once.
   * - For each item, it performs a constant-time get operation and potentially a set operation.
   */
  private async initializeConfig() {
    const configs = [
      { key: 'slotDuration', value: 30 },
      { key: 'maxSlotsPerAppointment', value: 5 },
      { key: 'operationalStartTime', value: '09:00' },
      { key: 'operationalEndTime', value: '18:00' },
      { key: 'operationalDays', value: [1, 2, 3, 4, 5] },
    ];

    for (const config of configs) {
      const existingConfig = await this.configService.get(config.key);
      if (!existingConfig) {
        await this.configService.set(config.key, config.value);
      }
    }
  }
}
