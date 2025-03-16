import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../../entities/donation.entity';
import { DonorClinic } from '../../entities/donor_clinic.entity';
import { Clinic } from '../../entities/clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, Donation, DonorClinic])],
  controllers: [ClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
