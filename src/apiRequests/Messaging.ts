import { ApiRequest } from "../core/ApiRequest";

export interface FcmMessagePayload {
  message: string;
}

export class Messaging extends ApiRequest {
  endpoint: string = '/api/fcm';
  endpointSingleton: string = '/api/fcm';

  /**
   * Subscribe to a topic
   * @param topic The topic to subscribe to
   * @returns Promise with the subscription result
   */
  async subscribeToTopic(topic: string): Promise<any> {
    const url = `${this.endpoint}/subscribe/${topic}`;
    return await this.apiRequest(url, 'POST', null);
  }

  /**
   * Unsubscribe from a topic
   * @param topic The topic to unsubscribe from
   * @returns Promise with the unsubscription result
   */
  async unsubscribeFromTopic(topic: string): Promise<any> {
    const url = `${this.endpoint}/unsubscribe/${topic}`;
    return await this.apiRequest(url, 'POST', null);
  }

  /**
   * Send a message to a topic
   * @param topic The topic to send the message to
   * @param payload The message payload
   * @returns Promise with the send result
   */
  async sendMessageToTopic(topic: string, payload: FcmMessagePayload): Promise<any> {
    const url = `${this.endpoint}/send/topic/${topic}`;
    return await this.apiRequest(url, 'POST', payload);
  }

  /**
   * Send a message to a specific device
   * @param deviceToken The device token to send the message to
   * @param payload The message payload
   * @returns Promise with the send result
   */
  async sendMessageToDevice(deviceToken: string, payload: FcmMessagePayload): Promise<any> {
    const url = `${this.endpoint}/send/to/${deviceToken}`;
    return await this.apiRequest(url, 'POST', payload);
  }
}