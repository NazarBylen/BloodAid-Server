import { Injectable } from '@nestjs/common';
import { ClinicDto } from './dto/clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../../entities/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  create(createClinicDto: ClinicDto) {
    return this.clinicRepository.insert(createClinicDto);
  }

  findAll() {
    return this.clinicRepository.find();
  }

  findOne(id: number) {
    return this.clinicRepository.findOneBy({ id });
  }

  update(id: number, updateClinicDto: ClinicDto) {
    return this.clinicRepository.update({ id }, updateClinicDto);
  }

  remove(id: number) {
    return this.clinicRepository.delete({ id });
  }
}
