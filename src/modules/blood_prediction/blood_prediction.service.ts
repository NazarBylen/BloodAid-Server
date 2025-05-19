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

  async predictDemand(month: number, region: number, year: number) {
    if (!this.model1 || !this.model2) throw new Error('Models are not loaded');

    const input1 = tf.tensor2d([[month, region, year]]);
    const prediction1 = this.model1.predict(input1) as tf.Tensor;
    const resultArray1 = (await prediction1.array()) as number[][];
    const [accidents, operations, donors] = resultArray1[0];

    if ([accidents, operations, donors].some(isNaN))
      throw new Error('Invalid prediction from model1');

    const input2 = tf.tensor2d([
      [month, region, year, accidents, operations, donors],
    ]);
    const prediction2 = this.model2.predict(input2) as tf.Tensor;
    const resultArray2 = (await prediction2.array()) as number[][];
    const [demand] = resultArray2[0];

    if (isNaN(demand)) throw new Error('Invalid prediction from model2');

    return { demand, accidents, operations, donors };
  }
}
