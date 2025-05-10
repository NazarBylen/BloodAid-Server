import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Patient } from './patient.entity';
import { Clinic } from './clinic.entity';

@Entity('donation')
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date_requested', nullable: true })
  dateRequested: string;

  @Column({ name: 'date_taken', nullable: true })
  dateTaken: string;

  @ManyToOne(() => Patient, (patient) => patient.donation, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  patient: Patient;

  @ManyToOne(() => Clinic, (clinic) => clinic.donation, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'clinicId', referencedColumnName: 'id' })
  clinic: Clinic;
}
