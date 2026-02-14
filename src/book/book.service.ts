import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { Database } from 'src/db/database.type';
import { BookDTO, CreateBookDTO } from './book.dto';
import { BookTitleAlreadyExistsException } from './book.exception';
import { books } from './book.schema';
import { Book } from './book.type';

@Injectable()
export class BookService {
  constructor(@Inject('DRIZZLE_DB') private db: Database) {}

  async create(dto: CreateBookDTO): Promise<BookDTO> {
    const exists =
      (await this.db.select().from(books).where(eq(books.title, dto.title)))
        .length != 0;

    if (exists) {
      throw new BookTitleAlreadyExistsException();
    }

    const result = await this.db
      .insert(books)
      .values({
        title: dto.title,
        description: dto.description,
      })
      .returning();

    const book = result[0];

    return {
      id: book.id,
      title: book.title,
      description: book.description ?? '',
    };
  }

  async getAll(): Promise<BookDTO[]> {
    const result = await this.db.select().from(books);

    return result.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description ?? '',
    }));
  }

  async getById(id: string): Promise<BookDTO> {
    const book = await this.getBookById(id);

    return {
      id: book.id,
      title: book.title,
      description: book.description ?? '',
    };
  }

  private async getBookById(id: string): Promise<Book> {
    const result = await this.db.select().from(books).where(eq(books.id, id));

    if (result.length == 0) {
      throw new NotFoundException('book not found');
    }

    const book = result[0];

    return {
      id: book.id,
      title: book.title,
      description: book.description ?? '',
    };
  }
}
