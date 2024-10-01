import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProfileController } from './profile.controller';
import { ApplicationModule } from '../applications/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController, ProfileController],
  providers: [],
})
export class AuthModule {}
