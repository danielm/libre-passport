import {
    Body,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';
  import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiException } from 'api/src/exceptions/ApiException';

@Controller('profile')
@ApiTags('Profile')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiBadRequestResponse({ description: 'Bad request, most likely a validation problem.', type: ApiException })
export class ProfileController {
    constructor() {}

    @Get()
    @ApiOkResponse()
    @ApiOperation({ summary: 'Return current user\'s information' })
    profile() {
        //TODO: ApiOkResponse -> type: User (?)
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
