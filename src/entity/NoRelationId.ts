import 'reflect-metadata';
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ForeignKeyTarget from './ForeignKeyTarget';

@Entity()
export default class NoRelationId extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ForeignKeyTarget)
  fkTarget: Promise<ForeignKeyTarget>;
} 
