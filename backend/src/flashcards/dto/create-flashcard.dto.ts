import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  question: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  answer: string;

}
