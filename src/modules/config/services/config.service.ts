import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Config } from '../entities/config.entity';
import { DayOff } from '../entities/day-off.entity';
import { UnavailableHour } from '../entities/unavailable-hour.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
    @InjectRepository(DayOff)
    private dayOffRepository: Repository<DayOff>,
    @InjectRepository(UnavailableHour)
    private unavailableHourRepository: Repository<UnavailableHour>,
  ) {}

  async get(key: string): Promise<any> {
    const config = await this.configRepository.findOne({ where: { key } });
    return config ? config.value : null;
  }

  async set(key: string, value: any): Promise<void> {
    let config = await this.configRepository.findOne({ where: { key } });
    if (!config) {
      config = new Config();
      config.key = key;
    }
    config.value = value;
    await this.configRepository.save(config);
  }

  async addDayOff(date: Date, description: string): Promise<DayOff> {
    const dayOff = new DayOff();
    dayOff.date = date;
    dayOff.description = description;
    return this.dayOffRepository.save(dayOff);
  }

  async getDaysOff(startDate: Date, endDate: Date): Promise<DayOff[]> {
    return this.dayOffRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  async addUnavailableHour(dayOfWeek: number, startTime: string, endTime: string, description: string): Promise<UnavailableHour> {
    const unavailableHour = new UnavailableHour();
    unavailableHour.dayOfWeek = dayOfWeek;
    unavailableHour.startTime = startTime;
    unavailableHour.endTime = endTime;
    unavailableHour.description = description;
    return this.unavailableHourRepository.save(unavailableHour);
  }

  async getUnavailableHours(dayOfWeek: number): Promise<UnavailableHour[]> {
    return this.unavailableHourRepository.find({
      where: { dayOfWeek },
    });
  }
}
