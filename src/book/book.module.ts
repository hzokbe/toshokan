import { Module } from '@nestjs/common';
import { DrizzleProvider } from 'src/db/database.provider';
import { BookService } from './book.service';

@Module({
  providers: [BookService, DrizzleProvider],
})
export class BookModule {}
