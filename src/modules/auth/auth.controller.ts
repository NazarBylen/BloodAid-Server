import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PatientDataDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUpPatient(@Body() patientData: PatientDataDto) {
    return await this.authService.signUp(patientData);
  }

  @Post('/login')
  async logInPatient(@Body() patientData: PatientDataDto) {
    return await this.authService.logIn(patientData);
  }

  @Patch('/change-password/:id')
  async changePatientPassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.authService.changePatientPassword(id, newPassword);
  }

  @Patch('/edit-profile/:id')
  async editPatientProfile(
    @Param('id') id: number,
    @Body() patientData: PatientDataDto,
  ) {
    return await this.authService.editPatientProfile(id, patientData);
  }

  @Delete('/delete/:id')
  async deletePatient(@Param('id') id: number) {
    return await this.authService.deletePatient(id);
  }
}
