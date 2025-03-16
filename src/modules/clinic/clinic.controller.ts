import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicDto } from './dto/clinic.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  async create(@Body() createClinicDto: ClinicDto) {
    await this.clinicService.create(createClinicDto);
    return { result: 'OK' };
  }

  @Get()
  async findAll() {
    return await this.clinicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clinicService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClinicDto: ClinicDto) {
    await this.clinicService.update(+id, updateClinicDto);
    return { result: 'OK' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clinicService.remove(+id);
    return { result: 'OK' };
  }
}
