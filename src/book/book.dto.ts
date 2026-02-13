import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @MaxLength(64)
  description: string;
}

export interface BookDTO {
  id: string;

  title: string;

  description: string;
}
