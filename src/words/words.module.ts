import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsResolver } from './words.resolver';

@Module({
  providers: [WordsResolver, WordsService]
})
export class WordsModule {}
