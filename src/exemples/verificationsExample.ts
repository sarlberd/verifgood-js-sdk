import { VGSDK, SdkConfiguration, Metadatas } from "../index";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure SDK with API credentials
const apiBaseUrl: string = process.env.API_BASE_URL_TEST || "";
const apiKey: string = process.env.API_KEY || "";

const sdkConfig: SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
const vgsdk: VGSDK = new VGSDK(sdkConfig);

// Example 1: Get verifications with metadata filtering
console.log("Example 1: Getting verifications with metadata filtering");
const metadatas = new Metadatas();
metadatas.setLimit(0, 10);

vgsdk.verifications.getVerifications(metadatas)
    .then(verifications => {
        console.log("Verifications retrieved successfully:");
        console.log(JSON.stringify(verifications, null, 2));
        console.log("\n");
        
        // If verifications were found, proceed with the next example
        if (verifications.datas && verifications.datas.length > 0) {
            const verificationId = verifications.datas[0].id;
            
            // Example 2: Get verification responses by ID
            console.log(`Example 2: Getting responses for verification ID ${verificationId}`);
            return vgsdk.verifications.getVerificationsReponsesById(verificationId);
        } else {
            console.log("No verifications found to continue with examples");
            return null;
        }
    })
    .then(responses => {
        if (responses) {
            console.log("Verification responses retrieved successfully:");
            console.log(JSON.stringify(responses, null, 2));
            console.log("\n");
        }
        
        // Example 3: Get verification calendar events
        console.log("Example 3: Getting verification calendar events");
        return vgsdk.verifications.getCalendarEvents(metadatas);
    })
    .then(calendarEvents => {
        console.log("Calendar events retrieved successfully:");
        console.log(JSON.stringify(calendarEvents, null, 2));
        console.log("\n");
        
        // Example 4: Get verification progression data
        console.log("Example 4: Getting verification progression data");
        return vgsdk.verifications.getProgression(null, metadatas);
    })
    .then(progression => {
        console.log("Progression data retrieved successfully:");
        console.log(JSON.stringify(progression, null, 2));
    })
    .catch(error => {
        console.error("Error occurred:");
        console.error(error);
    });

// Alternative example: Start a verification process for an equipment
async function startVerificationDemo(equipementId: number, tacheId?: number) {
    try {
        console.log(`Starting verification for equipment ID ${equipementId}`);
        const verification = await vgsdk.verifications.startVerification(equipementId, tacheId);
        console.log("Verification started successfully:");
        console.log(JSON.stringify(verification, null, 2));
        return verification;
    } catch (error) {
        console.error("Failed to start verification:", error);
    }
}

// Uncomment to run the separate example
/*
// Run the separate example with a specific equipment ID
const equipementId = 123; // Replace with an actual equipment ID
startVerificationDemo(equipementId);
*/
