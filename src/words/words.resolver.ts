import { Query, Resolver } from '@nestjs/graphql';

import { WordsService } from './words.service';

@Resolver((of) => [String])
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) { }
  @Query(() => [String], { name: 'words' })
  words(): string[] {
    return this.wordsService.findWord();
  }
}
