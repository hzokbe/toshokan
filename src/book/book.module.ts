import { Module } from '@nestjs/common';
import { DrizzleProvider } from 'src/db/database.provider';
import { RedisModule } from 'src/redis/redis.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  providers: [BookService, DrizzleProvider],
  controllers: [BookController],
  imports: [RedisModule],
})
export class BookModule {}
