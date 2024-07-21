import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKUsers',
  })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  sir_name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email: string;

  @Column({ type: 'date', nullable: false })
  date_initial: Date;

  @Column({ type: 'date', nullable: false })
  date_end: Date;

  @OneToMany(() => Permission, (permission) => permission.user)
  @JoinColumn({
    name: 'permission_id',
    foreignKeyConstraintName: 'permission_foreign_fk',
  })
  permissions: Permission[];
}
