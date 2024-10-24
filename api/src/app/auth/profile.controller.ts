import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApplicationGuard } from '../application.guard';
import { ApiException } from '@libre-passport/api-common';

@Controller('profile')
@UseGuards(ApplicationGuard)
@ApiTags('Profile')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiBadRequestResponse({ description: 'Bad request, most likely a validation problem.', type: ApiException })
export class ProfileController {
  @Get()
  @ApiOkResponse()
  @ApiOperation({ summary: 'Return current user\'s information' })
  profile(
    // @Req() req
  ) {
    //TODO: ApiOkResponse -> type: User (?)
    // return req.application;
    return null;
  }

  @Post()
  @ApiOkResponse()
  @ApiOperation({ summary: 'Update current user\'s information' })
  update(@Body() updateProfile: UpdateProfileDto) {
    //TODO: ApiOkResponse -> type: User (?)
    return null;
  }

  // TODO: Change password newPass,newpassconfirm
  // TODO: Change email newEmail -> sends a verification email if enabled in Application User->Emails[] (?)
 }
