import { Resolver, Query } from '@nestjs/graphql';
import { WordsService } from './words.service';

import { ProtectTo } from 'src/shared/decorators';
import { EPermission } from 'src/shared/enums';

@Resolver('Word')
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) { }
  @ProtectTo(EPermission.READ)
  @Query(() => [String], { name: 'words' })
  words(): string[] {
    return this.wordsService.findWord();
  }
}
