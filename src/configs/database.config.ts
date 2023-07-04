import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }
  createTypeOrmOptions() {
    const baseDir = __dirname;
    const entitiesPath = path.join(baseDir, '../**/**.entity{.ts,.js}');
    const migrationPath = path.join(baseDir, '../../db/seed/*.{.ts,.js}');

    return {
      type: 'postgres' as const,
      host: this.configService.get('POSTGRES_HOST', 'localhost'),
      port: this.configService.get<number>('POSTGRES_PORT', 5432),
      username: this.configService.get<string>('POSTGRES_USERNAME', 'postgres'),
      password: this.configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
      database: this.configService.get<string>('POSTGRES_DATABASE', 'prism'),
      synchronize: false,
      entities: [entitiesPath],
      migrations: [migrationPath],
      logging: this.configService.get('POSTGRES_LOGGING', 'true') === 'true',
    };
  }
}
