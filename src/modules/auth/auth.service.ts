import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Patient,
  patientBloodType,
  patientRhFactor,
} from '../../entities/patient.entity';
import { PatientDataDto } from './dto/auth.dto';
import { Donation } from '../../entities/donation.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private dataSource: DataSource,
  ) {}

  async signUp(patientData: PatientDataDto) {
    try {
      const { email, password, full_name, rh_factor, blood_type } = patientData;
      const fullName = full_name;

      const patient = await this.patientRepository.findOneBy({ email });
      if (patient)
        throw {
          message: 'Patient with this email already exists',
          status: 404,
        };
      const patient2 = await this.patientRepository.findOneBy({ fullName });
      if (patient2)
        throw { message: 'Patient with this name already exists', status: 404 };

      if (!Object.values(patientRhFactor).includes(rh_factor))
        throw { message: 'incorrect Rh Factor', status: 404 };
      if (!Object.values(patientBloodType).includes(blood_type))
        throw { message: 'incorrect blood type', status: 404 };

      const newPatient = this.patientRepository.create({
        email: email,
        password: password,
        fullName: full_name,
        rh_factor: rh_factor,
        blood_type: blood_type,
      });

      await this.patientRepository.save(newPatient);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async logIn(patientData: PatientDataDto) {
    try {
      const { email, password } = patientData;

      const patient = await this.patientRepository.findOneBy({ email });
      if (!patient) throw { message: 'Patient does not exist', status: 404 };

      const id = patient.id;
      const name = patient.fullName;

      const checkPassword = password === patient.password;
      if (!checkPassword)
        throw { message: 'Wrong username or password', status: 404 };

      return {
        id,
        email,
        name,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async changePatientPassword(id: number, newPassword: string) {
    const user = await this.patientRepository.findOneBy({ id });
    user.password = newPassword;
    await this.patientRepository.save(user);
  }

  async editPatientProfile(id: number, patientData: PatientDataDto) {
    const user = await this.patientRepository.findOneBy({ id });

    Object.assign(user, patientData);
    await this.patientRepository.save(user);
  }

  async deletePatient(id: number) {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(Donation, { patient: { id: id } });
      const user = await this.patientRepository.findOneBy({ id });
      await this.patientRepository.delete(user);
    });
  }
}
