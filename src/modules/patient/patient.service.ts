import { Injectable } from '@nestjs/common';
import { PatientDto } from './dto/Patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: PatientDto) {
    return this.patientRepository.insert(createPatientDto);
  }

  findAll() {
    return this.patientRepository.find();
  }

  findOne(id: number) {
    return this.patientRepository.findOneBy({ id });
  }

  update(id: number, updatePatientDto: PatientDto) {
    return this.patientRepository.update({ id }, updatePatientDto);
  }

  remove(id: number) {
    return this.patientRepository.delete({ id });
  }
}
