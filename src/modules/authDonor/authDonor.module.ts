import { Module } from '@nestjs/common';
import { AuthDonorService } from './authDonor.service';
import { AuthDonorController } from './authDonor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '../../entities/clinic.entity';
import { Donor } from '../../entities/donor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donor, Clinic])],
  controllers: [AuthDonorController],
  providers: [AuthDonorService],
  exports: [AuthDonorService],
})
export class AuthDonorModule {}
