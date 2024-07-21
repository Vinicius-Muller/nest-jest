import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKUsers',
  })
  @Index('INUsers', { unique: true })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  sir_name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  permissions: string[];

  @Column({ type: 'date', nullable: false })
  date_initial: Date;

  @Column({ type: 'date', nullable: false })
  date_end: Date;
}
