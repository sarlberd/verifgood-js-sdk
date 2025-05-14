"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let apiBaseUrl = process.env.API_BASE_URL_TEST || "";
let apiKey = process.env.API_KEY || "";
let sdkConfig = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk = new index_1.VGSDK(sdkConfig);
const deviceToken = "your-device-token"; // Replace with your actual device token
vgsdk.messaging.subscribeToTopic("debug", deviceToken).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});
vgsdk.messaging.sendMessageToTopic("debug", { message: "Hello World" }).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});
vgsdk.messaging.sendMessageToDevice(deviceToken, { message: "Hello World" }).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});
vgsdk.messaging.unsubscribeFromTopic("debug", deviceToken).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(JSON.parse(error).status);
});
