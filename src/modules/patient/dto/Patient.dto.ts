import { IsInt, IsString } from 'class-validator';
import {
  patientBloodType,
  patientRhFactor,
} from '../../../entities/patient.entity';
import { Donation } from '../../../entities/donation.entity';

export class PatientDto {
  @IsInt()
  id?: number;

  @IsString()
  fullName?: string;

  @IsString()
  email?: string;

  @IsString()
  password?: string;

  blood_type?: patientBloodType;

  rh_factor?: patientRhFactor;

  donation?: Donation[];
}
