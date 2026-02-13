import { Controller, Get } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private service: BookService) {}

  @Get()
  async getAll(): Promise<BookDTO[]> {
    return this.service.getAll();
  }
}
