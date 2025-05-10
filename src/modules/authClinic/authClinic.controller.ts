import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthClinicService } from './authClinic.service';
import { authClinicDto } from './dto/authClinic.dto';

@Controller('auth-clinic')
export class AuthClinicController {
  constructor(private readonly authClinicService: AuthClinicService) {}

  @Post('/sign-up')
  async signUpPatient(@Body() clinicData: authClinicDto) {
    return await this.authClinicService.clinicSignUp(clinicData);
  }

  @Post('/login')
  async logInPatient(@Body() clinicData: authClinicDto) {
    return await this.authClinicService.clinicLogIn(clinicData);
  }

  @Patch('/change-password/:id')
  async changePatientPassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.authClinicService.changeClinicPassword(id, newPassword);
  }

  @Delete('/delete-clinic/:id')
  async deleteClinic(@Param('id') id: number) {
    return await this.authClinicService.deleteClinic(id);
  }
}
