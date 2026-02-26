import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private client: RedisClientType;

  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = createClient();
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
}
