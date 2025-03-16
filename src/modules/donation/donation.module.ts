import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../../entities/donation.entity';
import { Clinic } from '../../entities/clinic.entity';
import { Patient } from '../../entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, Patient, Clinic])],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}
