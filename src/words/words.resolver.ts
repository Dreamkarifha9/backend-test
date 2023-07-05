import { Query, Resolver } from '@nestjs/graphql';

import { Word } from './word.entity';
import { WordsService } from './words.service';

@Resolver((of) => Word)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) { }
  @Query(() => Word, { name: 'words' })
  words(): Word {
    console.log('in');
    return this.wordsService.findWord();
  }
}
