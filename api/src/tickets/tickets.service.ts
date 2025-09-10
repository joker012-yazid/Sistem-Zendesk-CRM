import { Injectable } from '@nestjs/common';
import { PrismaClient, Ticket } from '@prisma/client';

@Injectable()
export class TicketsService {
  private prisma = new PrismaClient();

  create(data: { subject: string; description: string; customerId: number }): Promise<Ticket> {
    return this.prisma.ticket.create({ data });
  }

  findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
