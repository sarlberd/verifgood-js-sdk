import { ApiRequest } from "../core/ApiRequest";
export interface FcmMessagePayload {
    message: string;
}
export declare class Messaging extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Subscribe to a topic
     * @param topic The topic to subscribe to
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the subscription result
     */
    subscribeToTopic(topic: string, deviceToken: string, options?: object): Promise<any>;
    /**
     * Unsubscribe from a topic
     * @param topic The topic to unsubscribe from
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the unsubscription result
     */
    unsubscribeFromTopic(topic: string, deviceToken: string, options?: object): Promise<any>;
    /**
     * Unsubscribe from all topics for a device
     * @param deviceToken The device token to unsubscribe from all topics
     * @returns Promise with the unsubscription result
     */
    unsubscribeFromAllTopics(deviceToken: string): Promise<any>;
    /**
     * Send a message to a topic
     * @param topic The topic to send the message to
     * @param payload The message payload
     * @returns Promise with the send result
     */
    sendMessageToTopic(topic: string, payload: FcmMessagePayload): Promise<any>;
    /**
     * Send a message to a specific device
     * @param deviceToken The device token to send the message to
     * @param payload The message payload
     * @returns Promise with the send result
     */
    sendMessageToDevice(deviceToken: string, payload: FcmMessagePayload): Promise<any>;
}
