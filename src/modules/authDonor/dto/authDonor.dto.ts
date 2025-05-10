import { IsInt, IsString } from 'class-validator';
import { donorBloodType, donorRhFactor } from '../../../entities/donor.entity';
import { DonorClinic } from '../../../entities/donor_clinic.entity';

export class DonorDto {
  @IsInt()
  id?: number;

  @IsString()
  full_name?: string;

  blood_type: donorBloodType;

  rh_factor: donorRhFactor;

  @IsString()
  email?: string;

  @IsString()
  password?: string;

  donorClinic?: DonorClinic[];
}
