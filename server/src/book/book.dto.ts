import { PartialType } from '@nestjs/mapped-types';
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

export class UpdateBookDTO extends PartialType(CreateBookDTO) {}

export interface BookDTO {
  id: string;

  title: string;

  description: string;
}
