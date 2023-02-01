import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { ChatGptResponse } from './dto/response-chatgpt.dto';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  constructor(apiKey: string){
    this.apiKey = apiKey;
  }
  async generateTextGPT3({ prompt }: CreateChatgptDto) {
    return this.generateText({ prompt, model:'text-davinci-003' })
  };
  async generateText({ prompt, model }: CreateChatgptDto) {
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/completions',
        {
          model,
          prompt,
          temperature: 1,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new HttpException('Falha ao gerar texto', error.response.status);
    }
  }
}
