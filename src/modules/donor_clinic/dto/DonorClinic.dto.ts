import { IsInt, IsString } from 'class-validator';
import { Donor } from '../../../entities/donor.entity';
import { Clinic } from '../../../entities/clinic.entity';

export class DonorClinicDto {
  @IsInt()
  id?: number;

  @IsString()
  dateRequestedToDonateBlood: string;

  @IsString()
  acceptedOrRejected: string;

  donor?: Donor;

  clinic?: Clinic;
}
