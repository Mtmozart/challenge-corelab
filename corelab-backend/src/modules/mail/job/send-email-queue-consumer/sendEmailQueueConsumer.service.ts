import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailConsumer } from '../../types/sendEmailConsumer.types';
import { SendEmailService } from '../../mail.service';

@Processor('SEND_EMAIL')
export class SendEmailQueueConsumer {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Process('SEND_EMAIL')
  async execute(job: Job<{ sendEmailQueue: SendEmailConsumer }>) {
    const { sendEmailQueue } = job.data;

    const { name, email } = sendEmailQueue;

    if (!name || !email) {
      console.error('Name or email is undefined');
      return;
    }

    await this.sendEmailService.sendEmailCreate({ name, email });
  }
  @OnQueueActive()
  onActive(job: Job<SendEmailConsumer>) {
    console.log(`Ativo`, job.id);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<SendEmailConsumer>, err: Error) {
    console.log(`Falha`, job.id, err);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<SendEmailConsumer>) {
    console.log(`Completo`, job.id);
  }
}
