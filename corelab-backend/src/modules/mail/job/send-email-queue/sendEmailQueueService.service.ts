import { Injectable } from '@nestjs/common';
import { SendEmailQueue } from '../../types/sendEmailQueue.types';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SendEmailQueueService {
  constructor(@InjectQueue('SEND_EMAIL') private sendEmailQueue: Queue) {}

  async execute(sendEmailQueue: SendEmailQueue) {
    try {
      await this.sendEmailQueue.add('SEND_EMAIL', { sendEmailQueue });
    } catch (error) {
      throw error;
    }
  }
}
