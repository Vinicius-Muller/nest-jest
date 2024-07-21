import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKPermission',
  })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.permissions, { cascade: true })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'user_foreign_fk',
  })
  user: User;
}
