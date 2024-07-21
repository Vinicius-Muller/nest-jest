import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsers1721538230801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users 
        ADD COLUMN permissions_user UUID[],
        DROP COLUMN permissions;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users 
        ADD COLUMN permissions UUID[];
        DROP COLUMN permissions_user;
      `);
  }
}
