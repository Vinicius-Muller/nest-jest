import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKPermission',
  })
  @Index('INPermission', { unique: true })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;
}
