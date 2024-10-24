import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ default: 1, description: 'Page number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiProperty({ default: 10, description: 'Items per page' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @Max(25)
  @Type(() => Number)
  limit: number;
}
