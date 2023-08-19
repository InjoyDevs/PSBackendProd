import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

const { Injectable } = require('@nestjs/common');

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    clientId: 'my-app',
    sasl: {
      username: 'y4hhu1tm',
      password: '7-Adb14xncdsU0nFrJ-yeEU3b01ruZNq',
      mechanism:'scram-sha-256'
    },
    ssl: true,
    brokers: ['dory-01.srvs.cloudkafka.com:9094', 'dory-02.srvs.cloudkafka.com:9094', 'dory-03.srvs.cloudkafka.com:9094'],
    // brokers: ['glider-01.srvs.cloudkafka.com:9094','glider-02.srvs.cloudkafka.com:9094','glider-03.srvs.cloudkafka.com:9094'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
