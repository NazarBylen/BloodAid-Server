import { Controller, Post, Body } from '@nestjs/common';
import { BloodPredictionService } from './blood_prediction.service';

@Controller('blood-prediction')
export class BloodPredictionController {
  constructor(
    private readonly bloodPredictionService: BloodPredictionService,
  ) {}

  @Post('predict')
  async predict(
    @Body() body: { day_of_week: number; season: number; holidays: number },
  ) {
    const { day_of_week, season, holidays } = body;
    return this.bloodPredictionService.predictDemand(
      day_of_week,
      season,
      holidays,
    );
  }
}
