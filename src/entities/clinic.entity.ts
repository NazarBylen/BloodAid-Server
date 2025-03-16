import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donation } from './donation.entity';
import { DonorClinic } from './donor_clinic.entity';

@Entity('clinic')
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false, unique: true })
  name: string;

  @Column({ name: 'phone_number', nullable: false, unique: true })
  phone_number: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @OneToMany(() => Donation, (donation) => donation.clinic)
  donation: Donation[];

  @OneToMany(() => DonorClinic, (donorClinic) => donorClinic.clinic)
  donorClinic: DonorClinic[];
}
