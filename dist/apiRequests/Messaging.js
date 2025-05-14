"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
     * @returns Promise with the subscription result
     */
    subscribeToTopic(topic, deviceToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.endpoint}/subscribe/${topic}`;
            const payload = { token: deviceToken };
            return yield this.apiRequest(url, 'POST', payload);
        });
    }
    /**
     * Unsubscribe from a topic
     * @param topic The topic to unsubscribe from
     * @param deviceToken The device token to include in the payload
     * @returns Promise with the unsubscription result
     */
    unsubscribeFromTopic(topic, deviceToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.endpoint}/unsubscribe/${topic}`;
            const payload = { token: deviceToken };
            return yield this.apiRequest(url, 'POST', payload);
        });
    }
    /**
     * Send a message to a topic
     * @param topic The topic to send the message to
     * @param payload The message payload
     * @returns Promise with the send result
     */
    sendMessageToTopic(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.endpoint}/send/topic/${topic}`;
            return yield this.apiRequest(url, 'POST', payload);
        });
    }
    /**
     * Send a message to a specific device
     * @param deviceToken The device token to send the message to
     * @param payload The message payload
     * @returns Promise with the send result
     */
    sendMessageToDevice(deviceToken, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.endpoint}/send/to/${deviceToken}`;
            return yield this.apiRequest(url, 'POST', payload);
        });
    }
}
exports.Messaging = Messaging;
