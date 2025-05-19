import { Controller, Post, Body } from '@nestjs/common';
import { BloodPredictionService } from './blood_prediction.service';

@Controller('blood-prediction')
export class BloodPredictionController {
  constructor(
    private readonly bloodPredictionService: BloodPredictionService,
  ) {}

  @Post('predict')
  async predict(@Body() body: { month: number; region: number; year: number }) {
    const { month, region, year } = body;
    return this.bloodPredictionService.predictDemand(month, region, year);
  }
}
