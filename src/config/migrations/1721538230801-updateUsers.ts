import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsers1721538230801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users 
        ALTER COLUMN permissions SET DATA TYPE UUID[] USING permissions::UUID[];
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users 
        ALTER COLUMN permissions SET DATA TYPE UUID;
      `);
  }
}
