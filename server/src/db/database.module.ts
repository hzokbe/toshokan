import { Module } from '@nestjs/common';
import { DrizzleProvider } from './database.provider';

@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleProvider],
})
export class DatabaseModule {}
