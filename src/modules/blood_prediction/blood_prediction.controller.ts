import { Controller, Post, Body } from '@nestjs/common';
import { BloodPredictionService } from './blood_prediction.service';

@Controller('predict')
export class BloodPredictionController {
  constructor(private readonly predictionService: BloodPredictionService) {}

  @Post()
  async predict(@Body() body: { input: number[] }) {
    const result = await this.predictionService.predict(body.input);
    return { prediction: result };
  }
}
