import { MigrationInterface, QueryRunner } from 'typeorm';

export class ForeignUpdate1721578520386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
				ALTER TABLE users
				ADD COLUMN permission_id UUID,
				ADD CONSTRAINT permission_foreign_fk FOREIGN KEY(permission_id) REFERENCES permissions(id);
				
				ALTER TABLE permissions
				ADD COLUMN user_id UUID,
				ADD CONSTRAINT user_foreign_fk FOREIGNN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;
			`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE users
			DROP CONSTRAINT permission_foreign_fk,
			DROP COLUMN permission_id;

			ALTER TABLE permissions
			DROP CONSTRAINT user_foreign_fk,
			DROP COLUMN user_id;
		`);
  }
}
