/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsString, IsOptional, Max, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    default: 1,
  })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @ApiProperty({
    default: 10,
  })
  limit: number = 10;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  orderBy?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  filter?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  yearId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  semesterId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  subjectId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  majorId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  classId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  roleId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  examId: number;
}
