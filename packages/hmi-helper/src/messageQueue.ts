import * as amqp from "amqplib";

export default class MessageQueue {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private readonly url: string;
  private readonly reconnectInterval: number;

  constructor(url: string, reconnectInterval = 5000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval; // Reconnection interval in milliseconds
  }

  async connect(): Promise<void> {
    while (!this.connection) {
      try {
        this.connection = await amqp.connect(this.url);
        this.channel = await this.connection.createChannel();
        console.log("Connected to Message Queue");
      } catch (error) {
        console.error(
          "Connection to MQ failed, retrying in",
          this.reconnectInterval / 1000,
          "seconds... \n",
          error
        );
        await new Promise((resolve) =>
          setTimeout(resolve, this.reconnectInterval)
        );
      }
    }
  }

  async reconnect(): Promise<void> {
    console.log("Attempting to reconnect to Message Queue...");
    this.connection = null;
    this.channel = null;
    await this.connect();
  }

  async createQueue(queue: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call connect() first.");
    }
    await this.channel.assertQueue(queue, { durable: true });
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call connect() first.");
    }
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async consume(
    queue: string,
    onMessage: (msg: amqp.ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call connect() first.");
    }
    await this.channel.consume(queue, (msg) => {
      if (msg) {
        onMessage(msg);
        this.channel?.ack(msg);
      }
    });
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    this.connection = null;
    this.channel = null;
  }
}
