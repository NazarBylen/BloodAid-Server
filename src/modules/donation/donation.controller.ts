import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationDto } from './dto/donation.dto';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async create(@Body() createDonationDto: DonationDto) {
    await this.donationService.create(createDonationDto);
    return { result: 'OK' };
  }

  @Get()
  async findAll() {
    return await this.donationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.donationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationDto: DonationDto,
  ) {
    await this.donationService.update(+id, updateDonationDto);
    return { result: 'OK' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.donationService.remove(+id);
    return { result: 'OK' };
  }
}
