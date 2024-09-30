import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: "applications",
})
export class Application {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: true })
  @ApiProperty()
  enabled?: boolean;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  url?: string;

  @Column({ default: false })
  @ApiPropertyOptional()
  enableRegistration?: boolean;

  @Column({ default: false })
  @ApiPropertyOptional()
  enableVerification?: boolean;

  // @Column({ nullable: true })
  // @ApiPropertyOptional()
  // publicKey?: string;

  // @Column({ nullable: true })
  // @Exclude()
  // privateKey?: string;

  // ToDo: has many Users

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
