import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PaginatedResponse } from '@libre-passport/api-common';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  findAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
  }

  async findAllPaginated(
    page = 1,
    limit = 10,
    options: FindManyOptions<Application> = {}
  ): Promise<PaginatedResponse<Application>> {
    const offset = (page - 1) * limit;
    const [data, total] = await this.applicationsRepository.findAndCount({
      ...options,
      skip: offset,
      take: limit,
    });

    if (data.length === 0 && (page > 1)) {
      throw new NotFoundException('No results on page');
    }

    const pages = Math.ceil(total / limit);

    return { data, total, page, limit, pages };
  }

  findOne(id: string): Promise<Application | null> {
    return this.applicationsRepository.findOneByOrFail({ id });
  }

  create(createApplicationDto: CreateApplicationDto) {
    const app = new Application;

    app.name = createApplicationDto.name;
    app.enabled = createApplicationDto.enabled;
    app.enableRegistration = createApplicationDto.enableRegistration;
    app.enableVerification = createApplicationDto.enableVerification;
    app.url = createApplicationDto.url;

    return this.applicationsRepository.save(app);
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const app = await this.applicationsRepository.findOneByOrFail({ id });

    const result = await this.applicationsRepository.update(app.id, updateApplicationDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Failed to update Application`);
    }
  }

  async remove(id: string) {
    const app = await this.applicationsRepository.findOneByOrFail({ id });

    const result = await this.applicationsRepository.softDelete(app.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Failed to remove Application`);
    }
  }
}
