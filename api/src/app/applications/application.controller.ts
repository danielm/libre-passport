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
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApplicationRepository } from './application.repository';
import { Application } from './application.entity';
import { ApiException } from 'api/src/exceptions/ApiException';
import { PaginationQueryDto } from 'api/src/utils/pagination-query.dto';
import { PaginatedResponse } from 'api/src/utils/paginated-response';
import { ApiOkPaginatedResponse } from 'api/src/decorators/api-ok-paginated-response';

@Controller('applications')
@ApiTags('Applications')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request, most likely a validation problem.', type: ApiException })
export class ApplicationController {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  @Get()
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
  @ApiOkResponse({ type: Application })
  @ApiNotFoundResponse( { description: 'Application not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationRepository.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Application })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.create(createApplicationDto);
  }

  @Patch(':id')
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse( { description: 'Application not found' })
  @ApiNoContentResponse({ description: 'Application removed'})
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationRepository.remove(id);
  }
}
