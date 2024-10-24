import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApplicationRepository } from './application.repository';
import { Application } from './application.entity';
import {
  ApiException,
  ApiOkPaginatedResponse,
  PaginatedResponse,
  PaginationQueryDto,
} from '@libre-passport/api-common';
import { ApplicationGuard } from '../application.guard';

@Controller('applications')
@UseGuards(ApplicationGuard)
@ApiTags('Applications')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request, most likely a validation problem.', type: ApiException })
export class ApplicationController {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  @Get()
  @ApiOperation({ summary: 'Returns a paginated list of Applications' })
  @ApiOkPaginatedResponse(Application)
  async findAll(
    @Query() paginationQuery: PaginationQueryDto
  ): Promise<PaginatedResponse<Application>> {
    return this.applicationRepository.findAllPaginated(
      paginationQuery.page,
      paginationQuery.limit
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a single Application details' })
  @ApiOkResponse({ type: Application })
  @ApiNotFoundResponse( { description: 'Application not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationRepository.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Application' })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Application })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.create(createApplicationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an Application' })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiNotFoundResponse( { description: 'Application not found' })
  @ApiAcceptedResponse({ description: 'Application updated'})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ) {
    return this.applicationRepository.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an Application' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse( { description: 'Application not found' })
  @ApiNoContentResponse({ description: 'Application removed'})
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationRepository.remove(id);
  }
}
