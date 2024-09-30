import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  findAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
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
    let app = await this.applicationsRepository.findOneByOrFail({ id });

    let result = await this.applicationsRepository.update(app.id, updateApplicationDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Failed to update Application`);
    }
  }

  async remove(id: string) {
    let app = await this.applicationsRepository.findOneByOrFail({ id });

    let result = await this.applicationsRepository.softDelete(app.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Failed to remove Application`);
    }
  }
}
