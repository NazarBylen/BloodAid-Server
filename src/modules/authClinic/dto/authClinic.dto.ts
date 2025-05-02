import { IsInt, IsString } from 'class-validator';

export class authClinicDto {
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
}
