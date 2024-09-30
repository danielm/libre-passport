import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProfileController } from './profile.controller';

@Module({
    imports: [],
    controllers: [AuthController, ProfileController],
    providers: [],
})
export class AuthModule {}
