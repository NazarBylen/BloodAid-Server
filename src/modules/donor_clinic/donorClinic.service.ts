import { Injectable } from '@nestjs/common';
import { DonorClinicDto } from './dto/DonorClinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonorClinic } from '../../entities/donor_clinic.entity';

@Injectable()
export class DonorClinicService {
  constructor(
    @InjectRepository(DonorClinic)
    private donorClinicRepository: Repository<DonorClinic>,
  ) {}

  create(createDonorClinicDto: DonorClinicDto) {
    return this.donorClinicRepository.insert(createDonorClinicDto);
  }

  findAll() {
    return this.donorClinicRepository.find();
  }

  findOne(id: number) {
    return this.donorClinicRepository.findOneBy({ id });
  }

  update(id: number, updateDonorClinicDto: DonorClinicDto) {
    return this.donorClinicRepository.update({ id }, updateDonorClinicDto);
  }

  remove(id: number) {
    return this.donorClinicRepository.delete({ id });
  }

  async findBloodDonationByDonor(id: number) {
    return this.donorClinicRepository.find({ where: { donor: { id: id } } });
  }

  async findBloodDonationByClinic(id: number) {
    return this.donorClinicRepository.find({
      where: {
        clinic: { id: id },
        acceptedOrRejected: 'true',
      },
    });
  }
}
