import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseUUIDPipe,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { ForgotDto } from './dto/forgot.dto';
import { LoginDto } from './dto/login.dto';
import { ApiException } from 'api/src/exceptions/ApiException';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AnswerInviteDto } from './dto/answer-invite.dto';
import { ApplicationGuard } from '../application.guard';

@Controller('auth')
@UseGuards(ApplicationGuard)
@ApiTags('Authentication')
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad request, most likely a validation problem.', type: ApiException })
export class AuthController {
    constructor() {}

    @Post('login')
    @ApiOperation({ summary: 'Sign in an user' })
    @ApiOkResponse()
    login(@Body() loginDto: LoginDto) {
        //TODO: ApiOkResponse -> Type:JWTApiResponse
      return null;
    }

    @Post('register')
    @ApiOkResponse()
    @ApiOperation({ summary: 'Registers a new user, sends a verification email if enabled in Application' })
    register(@Body() registerDto: RegisterDto) {
      return null;
    }

    @Get('verify/:token')
    @ApiOkResponse()
    @ApiOperation({ summary: 'Verifies the user\'s email (link from email)' })
    verify(
        @Param('token', ParseUUIDPipe) token: string,
    ) {
      return null;
    }

    @Post('forgot')
    @ApiOkResponse()
    @ApiOperation({ summary: 'Sends a reset password link to the user\'s email' })
    forgot(@Body() forgotDto: ForgotDto) {
      return null;
    }

    @Post('reset/:token')
    @ApiOkResponse()
    @ApiOperation({ summary: 'Resets the user\'s password (link from email)' })
    reset(
        @Param('token', ParseUUIDPipe) token: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
      return null;
    }

    @Post('invite/:token')
    @ApiOkResponse()
    @ApiOperation({ summary: 'Accepts or Rejects an invite to join the application' })
    invite(
        @Param('token', ParseUUIDPipe) token: string,
        @Body() answerInviteDto: AnswerInviteDto,
    ) {
      // TODO: This creates a new user, kinda like register
      return null;
    }
  }

