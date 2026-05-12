import { VGSDK, SdkConfiguration, Metadatas }  from "../index";
import dotenv from 'dotenv';

dotenv.config();

let apiBaseUrl : string = process.env.API_BASE_URL_TEST || "";
let apiKey : string = process.env.API_KEY || "";

let sdkConfig : SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk : VGSDK = new VGSDK(sdkConfig);
const deviceToken = "your-device-token"; // Replace with your actual device token

vgsdk.messaging.subscribeToTopic("debug", deviceToken).then((response : any) => {
    console.log(response);
}).catch((error :any ) => {
    console.error(error);
});

vgsdk.messaging.sendMessageToTopic("debug", { message: "Hello World" }).then((response: any) => {
    console.log(response);
}).catch((error: any) => {
    console.error(error);
});

vgsdk.messaging.sendMessageToDevice(deviceToken, { message: "Hello World" }).then((response:any) => {
    console.log(response);
}).catch((error:any) => {
    console.error(error);
});

vgsdk.messaging.unsubscribeFromTopic("debug", deviceToken).then((response:any) => {
    console.log(response);
}).catch((error:any) => {
    console.error(error);
});