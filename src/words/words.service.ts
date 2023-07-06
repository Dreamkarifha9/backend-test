import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WordsService {
  private readonly logger: Logger = new Logger(WordsService.name);
  findWord(): string[] {
    const inputString = 'catbutterflybat';
    const dictionary = ['butterfly', 'cat', 'dog', 'bat'];

    const output = this.cutWords(inputString, dictionary);
    return output;
  }

  cutWords(inputString: string, dictionary: string[]): string[] {
    const output = [];
    let currentWord = '';
    for (let i = 0; i < inputString.length; i++) {
      currentWord += inputString[i];
      if (dictionary.includes(currentWord)) {
        output.push(currentWord);
        currentWord = '';
      }
    }
    return output;
  }
}
