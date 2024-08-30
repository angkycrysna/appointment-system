import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from '../services/config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getConfig() {
    return {
      operationalStartTime: await this.configService.get('operationalStartTime'),
      operationalEndTime: await this.configService.get('operationalEndTime'),
      slotDuration: await this.configService.get('slotDuration'),
      operationalDays: await this.configService.get('operationalDays'),
    };
  }

  @Post('days-off')
  async setDayOff(@Body() dayOff: { date: string; description: string }) {
    return this.configService.addDayOff(new Date(dayOff.date), dayOff.description);
  }

  @Post('unavailable-hours')
  async setUnavailableHour(@Body() unavailableHour: { dayOfWeek: number; startTime: string; endTime: string; description: string }) {
    return this.configService.addUnavailableHour(
      unavailableHour.dayOfWeek,
      unavailableHour.startTime,
      unavailableHour.endTime,
      unavailableHour.description
    );
  }
}
