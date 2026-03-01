import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private client: RedisClientType;

  private readonly logger = new Logger(RedisService.name);

  constructor(configService: ConfigService) {
    this.client = createClient({
      url: configService.get<string>('REDIS_URL'),
    });
  }

  async onModuleInit() {
    if (this.client.isOpen) {
      this.logger.log('Already connected');

      return;
    }

    await this.client.connect();

    this.logger.log('Connected');
  }

  async onApplicationShutdown() {
    await this.client.quit();

    this.logger.log('Disconnected');
  }

  getClient() {
    return this.client;
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await this.client.get(key);

    return result && JSON.parse(result);
  }

  async set<T>(key: string, value: T) {
    await this.client.set(key, JSON.stringify(value), {
      expiration: { type: 'EX', value: 30 },
    });
  }
}
