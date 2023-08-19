import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
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

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'ppsqosae-ps-backend ',
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (let i = 0; i < this.consumers.length; i++) {
      this.consumers[i].disconnect();
    }
  }
}
