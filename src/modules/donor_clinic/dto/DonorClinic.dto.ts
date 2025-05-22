import { IsBoolean, IsInt, IsString } from 'class-validator';
import { Donor } from '../../../entities/donor.entity';
import { Clinic } from '../../../entities/clinic.entity';

export class DonorClinicDto {
  @IsInt()
  id?: number;

  @IsString()
  dateRequestedToDonateBlood: string;

  @IsBoolean()
  acceptedOrRejected: boolean;

  donor?: Donor;

  clinic?: Clinic;
}
