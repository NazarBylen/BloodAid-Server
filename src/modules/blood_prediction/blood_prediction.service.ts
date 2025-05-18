import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';
import * as path from 'path';

@Injectable()
export class BloodPredictionService implements OnModuleInit {
  private model1: tf.LayersModel;
  private model2: tf.LayersModel;

  async onModuleInit() {
    const model1Path = `file://${path.resolve(__dirname, '../../../public/model1/model.json')}`;
    const model2Path = `file://${path.resolve(__dirname, '../../../public/model2/model.json')}`;

    this.model1 = await tf.loadLayersModel(model1Path);
    this.model2 = await tf.loadLayersModel(model2Path);
    console.log('Models loaded');
  }

  async predictDemand(day_of_week: number, season: number, holidays: number) {
    if (!this.model1 || !this.model2) {
      throw new Error('Models are not loaded yet');
    }

    const input1 = tf.tensor2d([[day_of_week, season, holidays]]);

    const predictionTensor = this.model1.predict(input1) as tf.Tensor;
    const predictionArray = await predictionTensor.array();

    const [accidents, operations, donors] = predictionArray[0];

    if ([accidents, operations, donors].some((x) => isNaN(x))) {
      throw new Error('Model1 prediction contains NaN');
    }

    const input2 = tf.tensor2d([
      [day_of_week, season, holidays, accidents, operations, donors],
    ]);
    const demandTensor = this.model2.predict(input2) as tf.Tensor;
    const demandArray = await demandTensor.array();

    const [demand] = demandArray[0];

    if (isNaN(demand)) {
      throw new Error('Model2 prediction contains NaN');
    }

    return { demand, accidents, operations, donors };
  }
}
