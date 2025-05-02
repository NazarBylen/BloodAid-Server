import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../../entities/donation.entity';
import { Patient } from '../../entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Donation])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
