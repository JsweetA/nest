import { Controller, Get, Inject } from '@nestjs/common';

import { BridService } from './brid.service';
import * as mqtt from 'mqtt';
import WebSocket, { WebSocketServer } from 'ws';

import { Brid } from 'src/entities/brid.entity';
import { parseTime } from '../../utils/time';

@Controller('brid')
export class BridController {
  // 单例模式
  client: mqtt.Client;
  ws: WebSocket;
  constructor(private readonly service: BridService) {
    this.initMqtt();
    this.initWs();
  }

  // 建立websocket连接
  async initWs() {
    // 创建websocket服务
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
        // 订阅mqtt
        this.client.subscribe(['/huas/admin', 'a']);

        console.log('mqtt success');
      } else {
        console.log('连接失败', err);
      }
    });

    // 监听消息并且通过websocket发送给前端
    this.client.on('message', async (topic, data) => {
      const res = JSON.parse(data.toString()).devices[0].services[0]
        .data as any;
      // const res = JSON.parse(data.toString());
      this.service.saveRecord(Object.assign(new Brid(), res));

      try {
        this.ws.send(
          JSON.stringify({ ...res, createAt: new Date().getTime() }),
        );
      } catch (e) {
        console.log(e);
      }
    });
  }

  // 获取所有
  @Get()
  async recordList() {
    const res = await this.service.recordList();
    res.reverse();
    return res.map((i) => {
      return {
        ...i,
        createAt: parseTime(i.createAt, '{y}-{m}-{d} {h}:{i}'),
      };
    });
  }
}
