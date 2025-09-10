import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketDto } from './ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private tickets: TicketsService) {}

  @Post()
  create(@Body() dto: TicketDto) {
    return this.tickets.create({ subject: dto.subject, description: dto.description, customerId: dto.customerId });
  }

  @Get()
  findAll() {
    return this.tickets.findAll();
  }
}
