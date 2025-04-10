import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorDto } from './dto/donor.dto';

@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  async create(@Body() createDonorDto: DonorDto) {
    await this.donorService.create(createDonorDto);
    return { result: 'OK' };
  }

  @Get()
  async findAll() {
    return await this.donorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.donorService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDonorDto: DonorDto) {
    await this.donorService.update(+id, updateDonorDto);
    return { result: 'OK' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.donorService.remove(+id);
    return { result: 'OK' };
  }
}
