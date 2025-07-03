"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messaging = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Messaging extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/fcm';
        this.endpointSingleton = '/api/fcm';
    }
    /**
     * Subscribe to a topic
     * @param topic The topic to subscribe to
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the subscription result
     */
    async subscribeToTopic(topic, deviceToken) {
        const url = `${this.endpoint}/subscribe/${topic}`;
        const payload = { token: deviceToken };
        return await this.apiRequest(url, 'POST', payload);
    }
    /**
     * Unsubscribe from a topic
     * @param topic The topic to unsubscribe from
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the unsubscription result
     */
    async unsubscribeFromTopic(topic, deviceToken) {
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
    async sendMessageToTopic(topic, payload) {
        const url = `${this.endpoint}/send/topic/${topic}`;
        return await this.apiRequest(url, 'POST', payload);
    }
    /**
     * Send a message to a specific device
     * @param deviceToken The device token to send the message to
     * @param payload The message payload
     * @returns Promise with the send result
     */
    async sendMessageToDevice(deviceToken, payload) {
        const url = `${this.endpoint}/send/to/${deviceToken}`;
        return await this.apiRequest(url, 'POST', payload);
    }
}
exports.Messaging = Messaging;
//# sourceMappingURL=Messaging.js.map