import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonorClinicService } from './donorClinic.service';
import { DonorClinicDto } from './dto/DonorClinic.dto';

@Controller('donorClinic')
export class DonorClinicController {
  constructor(private readonly donorClinicService: DonorClinicService) {}

  @Post()
  async create(@Body() createDonorClinicDto: DonorClinicDto) {
    await this.donorClinicService.create(createDonorClinicDto);
    return { result: 'OK' };
  }

  @Get()
  async findAll() {
    return await this.donorClinicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.donorClinicService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonorClinicDto: DonorClinicDto,
  ) {
    await this.donorClinicService.update(+id, updateDonorClinicDto);
    return { result: 'OK' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.donorClinicService.remove(+id);
    return { result: 'OK' };
  }
}
