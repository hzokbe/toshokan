import { Inject, Injectable } from '@nestjs/common';
import type { Database } from 'src/db/database.type';
import { BookDTO } from './book.dto';
import { books } from './book.schema';

@Injectable()
export class BookService {
  constructor(@Inject('DRIZZLE_DB') private db: Database) {}

  async getAll(): Promise<BookDTO[]> {
    const result = await this.db.select().from(books);

    return result.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description ?? '',
    }));
  }
}
