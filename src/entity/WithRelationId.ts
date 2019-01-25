import 'reflect-metadata';
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import ForeignKeyTarget from './ForeignKeyTarget';

@Entity()
export default class WithRelationId extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((x: WithRelationId) => x.fkTarget)
  fkTargetId: number;

  @ManyToOne(type => ForeignKeyTarget)
  fkTarget: Promise<ForeignKeyTarget>;
} 
