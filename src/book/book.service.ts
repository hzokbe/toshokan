import { Inject, Injectable } from '@nestjs/common';
import type { Database } from 'src/db/database.type';

@Injectable()
export class BookService {
  constructor(@Inject('DRIZZLE_DB') private db: Database) {}
}
