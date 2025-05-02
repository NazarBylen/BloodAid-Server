import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthClinicService } from './authClinic.service';
import { authClinicDto } from './dto/authClinic.dto';

@Controller('auth-clinic')
export class AuthClinicController {
  constructor(private readonly authClinicService: AuthClinicService) {}

  @Post('/sign-up')
  async signUpPatient(@Body() clinicData: authClinicDto) {
    return await this.authClinicService.signUp(clinicData);
  }

  @Post('/login')
  async logInPatient(@Body() clinicData: authClinicDto) {
    return await this.authClinicService.logIn(clinicData);
  }

  @Patch('/change-password/:id')
  async changePatientPassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.authClinicService.changePatientPassword(id, newPassword);
  }

  @Patch('/edit-profile/:id')
  async editPatientProfile(
    @Param('id') id: number,
    @Body() clinicData: authClinicDto,
  ) {
    return await this.authClinicService.editPatientProfile(id, clinicData);
  }

  @Delete('/delete/:id')
  async deletePatient(@Param('id') id: number) {
    return await this.authClinicService.deletePatient(id);
  }
}
