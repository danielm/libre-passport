import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';
import { Application } from './application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationRepository],
  exports: [ApplicationRepository, Application/*, TypeOrmModule*/],
})
export class DataAccessApplicationModule {}
