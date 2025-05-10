import { IsInt, IsString } from 'class-validator';
import { Patient } from '../../../entities/patient.entity';
import { Clinic } from '../../../entities/clinic.entity';

export class DonationDto {
  @IsInt()
  id?: number;

  @IsString()
  dateRequested: string;

  @IsString()
  dateTaken?: string;

  @IsString()
  city?: string;

  patient?: Patient;

  clinic?: Clinic;
}
