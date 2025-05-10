import { IsInt, IsString } from 'class-validator';
import { Donation } from '../../../entities/donation.entity';

export class ClinicDto {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsString()
  phone_number?: string;

  @IsString()
  city?: string;

  @IsString()
  password?: string;

  donation?: Donation[];
}
