import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookDTO, CreateBookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private service: BookService) {}

  @Post()
  async create(@Body() dto: CreateBookDTO): Promise<BookDTO> {
    return this.service.create(dto);
  }

  @Get()
  async getAll(): Promise<BookDTO[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BookDTO> {
    return this.service.getById(id);
  }
}
