import { Injectable } from '@nestjs/common';
import { DonorDto } from './dto/donor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donor } from '../../entities/donor.entity';

@Injectable()
export class DonorService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
  ) {}

  create(createDonorDto: DonorDto) {
    return this.donorRepository.insert(createDonorDto);
  }

  findAll() {
    return this.donorRepository.find();
  }

  findOne(id: number) {
    return this.donorRepository.findOneBy({ id });
  }

  update(id: number, updateDonorDto: DonorDto) {
    return this.donorRepository.update({ id }, updateDonorDto);
  }

  remove(id: number) {
    return this.donorRepository.delete({ id });
  }
}
