import { Injectable, Logger } from '@nestjs/common';
import { Word } from './word.entity';

@Injectable()
export class WordsService {
  private readonly logger: Logger = new Logger(WordsService.name);
  findWord(): Word {
    const inputString = 'catbutterflybat';
    const dictionary = ['butterfly', 'cat', 'dog', 'bat'];

    const output = this.cutWords(inputString, dictionary);
    const word = new Word();
    word.output = output;
    return word;
  }

  cutWords(inputString: string, dictionary: string[]): string[] {
    const output = [];
    let currentWord = '';

    for (let i = 0; i < inputString.length; i++) {
      currentWord += inputString[i];
      this.logger.log(`currentWord ${currentWord}`);

      if (dictionary.includes(currentWord)) {
        output.push(currentWord);
        currentWord = '';
      }
    }

    return output;
  }
}
