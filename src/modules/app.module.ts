import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ClinicModule } from './clinic/clinic.module';
import { DonationModule } from './donation/donation.module';
import { DonorModule } from './donor/donor.module';
import { DonorClinicModule } from './donor_clinic/DonorClinic.module';
import { PatientModule } from './patient/Patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClinicModule,
    DonationModule,
    DonorModule,
    DonorClinicModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
