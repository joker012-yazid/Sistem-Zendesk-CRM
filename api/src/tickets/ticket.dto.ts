import { IsNotEmpty, IsString } from 'class-validator';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  description: string;

  @IsString()
  customerId: string;
}
