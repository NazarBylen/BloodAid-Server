import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DonorClinic } from './donor_clinic.entity';

export enum donorBloodType {
  O = 'O',
  A = 'A',
  B = 'B',
  AB = 'AB',
}

export enum donorRhFactor {
  RhPositive = 'Rh+',
  RhNegative = 'Rh-',
}

@Entity('donor')
export class Donor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: false, unique: true })
  fullName: string;

  @Column({
    name: 'blood_type',
    nullable: false,
    type: 'enum',
    enum: donorBloodType,
  })
  blood_type: donorBloodType;

  @Column({
    name: 'rh_factor',
    nullable: false,
    type: 'enum',
    enum: donorRhFactor,
  })
  rh_factor: donorRhFactor;

  @OneToMany(() => DonorClinic, (donorClinic) => donorClinic.donor)
  donorClinic: DonorClinic[];
}
