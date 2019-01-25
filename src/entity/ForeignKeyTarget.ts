import 'reflect-metadata';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ForeignKeyTarget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
} 
