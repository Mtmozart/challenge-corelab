import { Module } from '@nestjs/common';
import { SendEmailService } from './mail.service';
import { SendEmailProvider } from './mail.provider';
import { SendEmailQueueService } from './job/send-email-queue/sendEmailQueueService.service';
import { SendEmailQueueConsumer } from './job/send-email-queue-consumer/sendEmailQueueConsumer.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'SEND_EMAIL' })],
  providers: [
    SendEmailQueueService,
    SendEmailQueueConsumer,
    SendEmailService,
    SendEmailProvider,
  ],
  exports: [SendEmailQueueService],
})
export class SendEmailModule {}
