import { Module } from '@nestjs/common';
import { DrizzleProvider } from 'src/db/database.provider';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  providers: [BookService, DrizzleProvider],
  controllers: [BookController],
})
export class BookModule {}
