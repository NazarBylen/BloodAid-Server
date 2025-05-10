import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Donor,
  donorBloodType,
  donorRhFactor,
} from '../../entities/donor.entity';
import { DonorDto } from './dto/authDonor.dto';
import { DonorClinic } from '../../entities/donor_clinic.entity';

@Injectable()
export class AuthDonorService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    private dataSource: DataSource,
  ) {}

  async signUp(donorData: DonorDto) {
    try {
      const { email, password, full_name, rh_factor, blood_type } = donorData;
      const fullName = full_name;

      const donor = await this.donorRepository.findOneBy({ email });
      if (donor)
        throw {
          message: 'Donor with this email already exists',
          status: 404,
        };
      const donor2 = await this.donorRepository.findOneBy({ fullName });
      if (donor2)
        throw { message: 'Donor with this name already exists', status: 404 };

      if (!Object.values(donorRhFactor).includes(rh_factor))
        throw { message: 'incorrect Rh Factor', status: 404 };
      if (!Object.values(donorBloodType).includes(blood_type))
        throw { message: 'incorrect blood type', status: 404 };

      const newDonor = this.donorRepository.create({
        email: email,
        password: password,
        fullName: full_name,
        rh_factor: rh_factor,
        blood_type: blood_type,
      });

      await this.donorRepository.save(newDonor);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async logIn(donorData: DonorDto) {
    try {
      const { email, password } = donorData;

      const donor = await this.donorRepository.findOneBy({ email });
      if (!donor) throw { message: 'Donor does not exist', status: 404 };

      const id = donor.id;
      const name = donor.fullName;

      const checkPassword = password === donor.password;
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

  async changeDonorPassword(id: number, newPassword: string) {
    const user = await this.donorRepository.findOneBy({ id });
    user.password = newPassword;
    await this.donorRepository.save(user);
  }

  async editDonorProfile(id: number, donorData: DonorDto) {
    const user = await this.donorRepository.findOneBy({ id });

    Object.assign(user, donorData);
    await this.donorRepository.save(user);
  }

  async deleteDonor(id: number) {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(DonorClinic, { donor: { id: id } });
      await manager.delete(Donor, { id: id });
    });
  }
}
