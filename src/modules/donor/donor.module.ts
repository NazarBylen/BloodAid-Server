import { Module } from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorController } from './donor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from '../../entities/donor.entity';
import { DonorClinic } from '../../entities/donor_clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donor, DonorClinic])],
  controllers: [DonorController],
  providers: [DonorService],
  exports: [DonorService],
})
export class DonorModule {}
