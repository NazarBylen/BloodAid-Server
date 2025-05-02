import { IsString } from 'class-validator';
import {
  patientBloodType,
  patientRhFactor,
} from '../../../entities/patient.entity';

export class PatientDataDto {
  @IsString()
  email?: string;
  @IsString()
  password?: string;

  @IsString()
  full_name?: string;

  blood_type?: patientBloodType;

  rh_factor?: patientRhFactor;
}
