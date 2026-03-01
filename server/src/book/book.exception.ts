import { HttpException, HttpStatus } from '@nestjs/common';

export class BookTitleAlreadyExistsException extends HttpException {
  constructor() {
    super({ message: 'book title already exists' }, HttpStatus.BAD_REQUEST);
  }
}
