"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messaging = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Messaging extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/fcm';
        this.endpointSingleton = '/api/fcm';
        this.topics = ["maintenance", "verification", "debug"];
    }
    /**
     * Subscribe to a topic
     * @param topic The topic to subscribe to
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the subscription result
     */
    async subscribeToTopic(topic, deviceToken, options = {}) {
        const url = `${this.endpoint}/subscribe/${topic}`;
        let payload = { ...options, token: deviceToken };
        return await this.apiRequest(url, 'POST', payload);
    }
    /**
     * Unsubscribe from a topic
     * @param topic The topic to unsubscribe from
     * @param deviceToken The device token to include in the payload
     * @param options Additional options to include in the payload
     * @returns Promise with the unsubscription result
     */
    async unsubscribeFromTopic(topic, deviceToken, options = {}) {
        const url = `${this.endpoint}/unsubscribe/${topic}`;
        const payload = { ...options, token: deviceToken };
        return await this.apiRequest(url, 'POST', payload);
    }
    /**
     * Unsubscribe from all topics for a device
     * @param deviceToken The device token to unsubscribe from all topics
     * @returns Promise with the unsubscription result
     */
    async unsubscribeFromAllTopics(deviceToken) {
        if (!deviceToken) {
            console.warn('Device token is required to unsubscribe from all topics');
            return;
        }
        const url = `${this.endpoint}/unsubscribe/all`;
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
    async getSubscribedTopics(deviceToken) {
        if (!deviceToken) {
            console.warn('Device token is required to get subscribed topics');
            return;
        }
        const url = `${this.endpoint}/subscribe/topics?token=${deviceToken}`;
        return await this.apiRequest(url, 'GET', null);
    }
    getAvailableTopics() {
        return this.topics;
    }
}
exports.Messaging = Messaging;
//# sourceMappingURL=Messaging.js.map