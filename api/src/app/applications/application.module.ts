import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationRepository],
  controllers: [ApplicationController],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}

