import { DynamicModule, Global, Module } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';

@Global()
@Module({
  exports: [ChatGptService],
  providers: [ChatGptService]
})
export class ChatGptModule {
  static forRoot(apiKey: string): DynamicModule {
    return {
      module: ChatGptModule,
      providers: [
        {
          provide: ChatGptService,
          useFactory: () => {
            return new ChatGptService(apiKey);
          },
        },
      ],
    };
  }
}
