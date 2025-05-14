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
   * @param deviceToken The device token to include in the payload
   * @returns Promise with the subscription result
   */
  async subscribeToTopic(topic: string, deviceToken: string): Promise<any> {
    const url = `${this.endpoint}/subscribe/${topic}`;
    const payload = { token: deviceToken };
    return await this.apiRequest(url, 'POST', payload);
  }

  /**
   * Unsubscribe from a topic
   * @param topic The topic to unsubscribe from
   * @param deviceToken The device token to include in the payload
   * @returns Promise with the unsubscription result
   */
  async unsubscribeFromTopic(topic: string, deviceToken: string): Promise<any> {
    const url = `${this.endpoint}/unsubscribe/${topic}`;
    const payload = { token: deviceToken };
    return await this.apiRequest(url, 'POST', payload);
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