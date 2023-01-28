import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { ChatGptResponse } from './dto/response-chatgpt.dto';

@Injectable()
export class ChatGptService {
  async generateText({ prompt, apiKey }: CreateChatgptDto): Promise<string> {
    console.log(prompt)
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: prompt,
          temperature: 1,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${apiKey}`,
          },
        },
      );
      return response.data.choices[0].text;
    } catch (error) {
      throw new HttpException('Falha ao gerar texto', error.response.status);
    }
  }
}
