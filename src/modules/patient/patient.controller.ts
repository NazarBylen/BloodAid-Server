import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/Patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientClinicDto: PatientDto) {
    await this.patientService.create(createPatientClinicDto);
    return { result: 'OK' };
  }

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: PatientDto) {
    await this.patientService.update(+id, updatePatientDto);
    return { result: 'OK' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientService.remove(+id);
    return { result: 'OK' };
  }
}
