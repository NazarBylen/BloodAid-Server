import { Module } from '@nestjs/common';
import { DonorClinicService } from './donorClinic.service';
import { DonorClinicController } from './donorClinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from '../../entities/donor.entity';
import { DonorClinic } from '../../entities/donor_clinic.entity';
import { Clinic } from '../../entities/clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonorClinic, Donor, Clinic])],
  controllers: [DonorClinicController],
  providers: [DonorClinicService],
  exports: [DonorClinicService],
})
export class DonorClinicModule {}
