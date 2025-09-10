import { PrismaClient, Role, Priority, TicketStatus, DealStage, ActivityType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      phone: '0100000000',
      role: Role.ADMIN,
      passwordHash: '$2b$10$Eo2a6m9r1gkG2vQ8Yb2E..zV8w2b3Z4T1qEoO2t6Tq5y7g9u/abcd'
    }
  });

  const standardSla = await prisma.slaPolicy.create({
    data: { name: 'Standard', firstReplyMins: 240, resolutionMins: 2880, priorityScope: null }
  });
  await prisma.slaPolicy.create({
    data: { name: 'Urgent', firstReplyMins: 30, resolutionMins: 240, priorityScope: Priority.URGENT }
  });

  const cat = await prisma.knowledgeCategory.create({ data: { name: 'General', slug: 'general' }});
  await prisma.knowledgeArticle.create({
    data: { categoryId: cat.id, title: 'Mula Guna Sistem', slug: 'mula-guna', bodyMarkdown: '# Selamat datang', isPublished: true }
  });

  const cust = await prisma.customer.create({ data: { name: 'Ahmad', email: 'ahmad@example.com', phone: '0123456789' }});
  const t1 = await prisma.ticket.create({
    data: {
      customerId: cust.id,
      subject: 'Tidak boleh log masuk',
      description: 'Sila bantu reset password.',
      status: TicketStatus.NEW,
      priority: Priority.NORMAL,
      channel: 'web',
      assigneeId: admin.id,
      slaPolicyId: standardSla.id
    }
  });
  await prisma.ticketComment.create({
    data: { ticketId: t1.id, authorUserId: admin.id, body: 'Kami sedang semak isu ini.', isInternal: false }
  });

  const lead = await prisma.lead.create({ data: { name: 'Siti', company: 'ABC Sdn Bhd', email: 'siti@abc.com', ownerId: admin.id }});
  const customer2 = await prisma.customer.create({ data: { name: 'Siti', email: 'siti@abc.com', company: 'ABC Sdn Bhd' }});
  const contact = await prisma.contact.create({ data: { customerId: customer2.id, ownerId: admin.id }});
  const deal = await prisma.deal.create({
    data: {
      contactId: contact.id,
      title: 'Langganan Tahunan',
      amountNumeric: 5000.00,
      stage: DealStage.PROSPECTING,
      ownerId: admin.id
    }
  });

  await prisma.activity.create({
    data: {
      type: ActivityType.NOTE,
      note: 'Hubungi client untuk demo minggu depan',
      ownerId: admin.id,
      dealId: deal.id
    }
  });

  await prisma.macro.create({
    data: { title: 'Reset Password SOP', actions: { setStatus: 'PENDING', addTags: ['howto'], cannedReply: 'Sila ikut langkah reset kata laluan...' } }
  });
  await prisma.trigger.create({
    data: {
      name: 'Auto-assign urgent',
      conditions: { onEvent: 'ticket.created', priority: 'URGENT' },
      actions: { assignToRole: 'AGENT', addTag: 'urgent' },
      isActive: true
    }
  });
}

main().then(() => prisma.$disconnect()).catch(e => { console.error(e); process.exit(1); });

