import { Injectable } from '@nestjs/common';
import { DonationDto } from './dto/donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from '../../entities/donation.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) {}

  create(createDonationDto: DonationDto) {
    return this.donationRepository.insert(createDonationDto);
  }

  findAll() {
    return this.donationRepository.find();
  }

  findOne(id: number) {
    return this.donationRepository.findOneBy({ id });
  }

  update(id: number, updateDonationDto: DonationDto) {
    return this.donationRepository.update({ id }, updateDonationDto);
  }

  remove(id: number) {
    return this.donationRepository.delete({ id });
  }
}
