import { Module } from '@nestjs/common';
import { BloodPredictionController } from './blood_prediction.controller';
import { BloodPredictionService } from './blood_prediction.service';

@Module({
  imports: [],
  controllers: [BloodPredictionController],
  providers: [BloodPredictionService],
  exports: [BloodPredictionService],
})
export class BloodPredictionModule {}
