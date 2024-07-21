import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1721514333508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE users (
        id UUID NOT NULL PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
        first_name VARCHAR(60) NOT NULL,
        sir_name VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        permissions UUID NOT NULL,
        date_initial DATE NOT NULL,
        date_end DATE NOT NULL
      );

      CREATE TABLE permissions (
        id UUID NOT NULL PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
        name VARCHAR(60) NOT NULL
      )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users;

      DROP TABLE permissions;
    `);
  }
}
