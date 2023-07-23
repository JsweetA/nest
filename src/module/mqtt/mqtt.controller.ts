import { Controller, Get } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Controller('mqtt')
export class MqttController {
  private mqttClient;
  @Get('open')
  openMqttServer() {
    this.mqttClient = mqtt.connect('mqtt://182.92.162.42:1883');
    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT server');
      // 订阅主题
      this.mqttClient.subscribe(['aaa'], (t, e) => {
        console.log(t, e);
      });
    });
    this.mqttClient.on('message', (e) => {
      console.log(e);
    });

    return 'ok';
  }
}
