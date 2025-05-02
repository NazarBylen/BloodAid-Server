import { Module } from '@nestjs/common';
import { AuthClinicService } from './authClinic.service';
import { AuthClinicController } from './authClinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '../../entities/clinic.entity';
import { Donation } from '../../entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, Donation])],
  controllers: [AuthClinicController],
  providers: [AuthClinicService],
  exports: [AuthClinicService],
})
export class AuthClinicModule {}
