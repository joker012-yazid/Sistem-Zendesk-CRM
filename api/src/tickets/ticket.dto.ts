import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  description: string;

  @IsInt()
  customerId: number;
}
