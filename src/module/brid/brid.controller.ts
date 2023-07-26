import { Controller, Get, Inject } from '@nestjs/common';
import {
  Payload,
  Ctx,
  MqttContext,
  MessagePattern,
  ClientProxy,
} from '@nestjs/microservices';
import { BridService } from './brid.service';
import * as mqtt from 'mqtt';
import WebSocket, { WebSocketServer } from 'ws';
import { debounce } from '../../utils/debunce';

@Controller('brid')
export class BridController {
  client: mqtt.Client;
  ws: WebSocket;
  constructor(private readonly service: BridService) {
    this.initWs();
  }

  // 建立websocket连接
  async initWs() {
    const wss = new WebSocketServer({
      port: 3002,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3,
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024, // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      },
    });
    wss.on('connection', (ws) => {
      this.ws = ws;
      this.initMqtt();
      ws.on('error', console.error);
      console.log('ws success');
    });
    return wss;
  }
  // 创建mqtt连接
  async initMqtt() {
    this.client = await mqtt.connect('mqtt://182.92.162.42:1883');

    this.client.on('connect', (err) => {
      if (err) {
        this.client.subscribe(['/huas/admin', 'a']);

        console.log('mqtt success');
      } else {
        console.log('连接失败', err);
      }
    });

    this.client.on('message', async (topic, data) => {
      if (topic === 'a') {
        console.log(data.toString());
        this.ws.send(data.toString());
      } else {
        debounce(() => {
          const res = JSON.parse(data.toString()) as any;
          const value = res.devices[0].services[0].data;
          console.log(value);
          this.service.saveRecord(value);
          this.ws.send(
            JSON.stringify({
              topic,
              data: { ...value, createAt: new Date().getTime() },
            }),
          );
        });
      }
    });
  }
  // 获取所有
  @Get()
  async recordList() {
    const res = await this.service.recordList();
    return res;
  }
}
