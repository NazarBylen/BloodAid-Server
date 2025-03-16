import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Clinic } from './clinic.entity';
import { Donor } from './donor.entity';

@Entity('donor_clinic')
export class DonorClinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date_taken' })
  dateTaken: string;

  @ManyToOne(() => Donor, (donor) => donor.donorClinic, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'donorId', referencedColumnName: 'id' })
  donor: Donor;

  @ManyToOne(() => Clinic, (clinic) => clinic.donorClinic, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'clinicId', referencedColumnName: 'id' })
  clinic: Clinic;
}
