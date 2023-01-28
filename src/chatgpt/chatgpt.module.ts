import { Module } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';


@Module({
  exports: [ChatGptService],
  providers: [ChatGptService]
})
export class ChatGptModule {}
