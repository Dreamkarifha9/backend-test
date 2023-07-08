import { forwardRef, Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsResolver } from './words.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  providers: [WordsResolver, WordsService],
})
export class WordsModule { }
