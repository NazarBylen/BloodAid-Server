import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { authClinicDto } from './dto/authClinic.dto';
import { Clinic } from '../../entities/clinic.entity';
import { Donation } from '../../entities/donation.entity';
import { DonorClinic } from '../../entities/donor_clinic.entity';

@Injectable()
export class AuthClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
    private dataSource: DataSource,
  ) {}

  async clinicSignUp(clinicData: authClinicDto) {
    try {
      const { name, password, phone_number, city } = clinicData;

      const clinic = await this.clinicRepository.findOneBy({ phone_number });
      if (clinic)
        throw {
          message: 'Clinic with this phone number already exists',
          status: 404,
        };
      const clinic2 = await this.clinicRepository.findOneBy({ name });
      if (clinic2)
        throw { message: 'Clinic with this name already exists', status: 404 };

      const newClinic = this.clinicRepository.create({
        city: city,
        password: password,
        name: name,
        phone_number: phone_number,
      });

      await this.clinicRepository.save(newClinic);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async clinicLogIn(clinicData: authClinicDto) {
    try {
      const { phone_number, password } = clinicData;

      const clinic = await this.clinicRepository.findOneBy({ phone_number });
      if (!clinic) throw { message: 'Clinic does not exist', status: 404 };

      const id = clinic.id;
      const name = clinic.name;

      const checkPassword = password === clinic.password;
      if (!checkPassword)
        throw { message: 'Wrong username or password', status: 404 };

      return {
        id,
        phone_number,
        name,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async changeClinicPassword(id: number, newPassword: string) {
    const clinic = await this.clinicRepository.findOneBy({ id });
    clinic.password = newPassword;
    await this.clinicRepository.save(clinic);
  }

  async deleteClinic(id: number) {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(Donation, { clinic: { id: id } });
      await manager.delete(DonorClinic, { clinic: { id: id } });
      const clinic = await this.clinicRepository.findOneBy({ id });
      await this.clinicRepository.delete(clinic);
    });
  }
}
