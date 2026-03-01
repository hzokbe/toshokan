import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DrizzleProvider = {
  provide: 'DRIZZLE_DB',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const pool = new Pool({
      connectionString: configService.get<string>('DATABASE_URL'),
    });

    return drizzle(pool);
  },
};
