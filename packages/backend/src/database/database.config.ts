import 'dotenv/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

const dbConfig: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  cli: {
    migrationsDir: 'src/database/migrations'
  },
  ssl: process.env.NODE_ENV === 'PROD',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: false, // NOTE: should be 'false' to avoid data loss, and to make the migrations work
  migrationsRun: process.env.RUN_MIGRATIONS === 'true', // automatically run migrations
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  seeds: [`${__dirname}/seeds/*.{ts,js}`],
  factories: [`${__dirname}/factories/*.{ts,js}`]
}

export default dbConfig
