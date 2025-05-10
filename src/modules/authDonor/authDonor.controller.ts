import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthDonorService } from './authDonor.service';
import { DonorDto } from './dto/authDonor.dto';

@Controller('auth-donor')
export class AuthDonorController {
  constructor(private readonly authDonorService: AuthDonorService) {}

  @Post('/sign-up')
  async signUpPatient(@Body() donorData: DonorDto) {
    return await this.authDonorService.signUp(donorData);
  }

  @Post('/login')
  async logInPatient(@Body() donorData: DonorDto) {
    return await this.authDonorService.logIn(donorData);
  }

  @Patch('/change-password/:id')
  async changePatientPassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.authDonorService.changeDonorPassword(id, newPassword);
  }

  @Patch('/edit-profile/:id')
  async editPatientProfile(
    @Param('id') id: number,
    @Body() donorData: DonorDto,
  ) {
    return await this.authDonorService.editDonorProfile(id, donorData);
  }

  @Delete('/delete/:id')
  async deletePatient(@Param('id') id: number) {
    return await this.authDonorService.deleteDonor(id);
  }
}
