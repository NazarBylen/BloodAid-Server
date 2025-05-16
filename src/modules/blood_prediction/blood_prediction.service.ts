import * as tf from '@tensorflow/tfjs-node';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class BloodPredictionService implements OnModuleInit {
  private model: tf.LayersModel;

  async onModuleInit() {
    this.model = await tf.loadLayersModel('file://public/model1/model.json');
    console.log('✅ Model loaded');
  }

  async predict(input: number[]): Promise<number> {
    const inputTensor = tf.tensor2d([input]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const value = (await prediction.data())[0];
    return value;
  }
}
