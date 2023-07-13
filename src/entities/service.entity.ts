import { Entity, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tenant } from './tenant.entity';
import { Role } from './role.entity';

@Entity()
@Unique(['key', 'mark'])
export class Service extends BaseEntity {
  constructor(e) {
    super();
    console.log(e);
  }

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  mark: string = '';

  @ManyToOne(() => Tenant, (tenant) => tenant.services, { onDelete: 'CASCADE' })
  tk: Tenant;

  @OneToMany(() => Role, (role) => role.svc)
  roles: Role[];
}
