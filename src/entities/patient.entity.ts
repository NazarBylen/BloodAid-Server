import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donation } from './donation.entity';

export enum patientBloodType {
  O = 'O',
  A = 'A',
  B = 'B',
  AB = 'AB',
}

export enum patientRhFactor {
  RhPositive = 'Rh+',
  RhNegative = 'Rh-',
}

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: false, unique: true })
  fullName: string;

  @Column({ name: 'blood_type', nullable: false })
  blood_type: patientBloodType;

  @Column({ name: 'rh_factor', nullable: false })
  rh_factor: patientRhFactor;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => Donation, (donation) => donation.patient)
  donation: Donation[];
}
