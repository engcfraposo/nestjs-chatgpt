## ChatGptService

This service allows you to generate text using the OpenAI API. It uses the axios library to make a post request to the OpenAI API with the provided prompt and API key.

The service exports a single method, generateText, which takes an object with a prompt and apiKey property as an argument. The prompt property should be a string containing the text you would like to generate a response for, and the apiKey property should be a string containing your OpenAI API key.

The generateText method returns a promise that resolves to the generated text.

# Usage

To use the ChatGptService, you will first need to import it and the CreateChatgptDto:


```ts
import { ChatGptService } from 'nestjs-chatgpt';

```

You will also need to import the Injectable decorator from @nestjs/common:


```ts
import { Injectable } from '@nestjs/common';

```

in your module you have to include the apiKey in forRoot method:

```ts
@Module({
  imports: [ChatGptModule.forRoot('Your apiKey')],
})
export class AppModule {}

```


You can then use the ChatGptService in a controller or another service by injecting it with the @Injectable() decorator:


```ts
@Injectable()
export class MyController {
  constructor(private readonly chatGptService: ChatGptService) {}

  async generateText(prompt: string): Promise<string> {
    const createChatgptDto: CreateChatgptDto = { prompt };
    return this.chatGptService.generateTextGPT3(createChatgptDto);
  }
}


```

```ts
@Injectable()
export class MyController {
  constructor(private readonly chatGptService: ChatGptService) {}

  async generateText(prompt: string, model: string, apiKey: string): Promise<string> {
    const createChatgptDto: CreateChatgptDto = { prompt, model };
    return this.chatGptService.generateText(createChatgptDto);
  }
}


```

You can then use the generateText method in your controller or service to generate text for the provided prompt:


```ts
@Injectable()
const generatedTextGPT3 = await this.generateTextGPT3('What is the meaning of life?', 'my-api-key');
console.log(generatedText);

```

```ts
@Injectable()
const generatedTextGPT3 = await this.generateText('What is the meaning of life?', 'text-davinci-003','my-api-key');
console.log(generatedText);

```
# Error Handling

The generateText method throws a HttpException if there is an error with generating the text.

It is recommended to catch the exception and handle it appropriately in your controller or service.

````ts
try {
  const generatedText = await this.generateText('What is the meaning of life?', 'my-api-key');
  console.log(generatedText);
} catch (error) {
  if (error instanceof HttpException) {
    console.log(`Error generating text: ${error.message}`);
  }
}

```
