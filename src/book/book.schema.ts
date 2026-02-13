import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').unique().notNull(),
  description: text('description'),
});
