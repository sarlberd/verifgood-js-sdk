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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Configure SDK with API credentials
const apiBaseUrl = process.env.API_BASE_URL_TEST || "";
const apiKey = process.env.API_KEY || "";
const sdkConfig = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
const vgsdk = new index_1.VGSDK(sdkConfig);
// Example 1: Generate an invitation link for a new admin user
console.log("Example 1: Generating invitation link");
const invitationRequest = {
    email: 'verifgood@gmail.com',
    role: 'ROLE_ADMIN'
};
vgsdk.invitations.generateInvitationLink(invitationRequest)
    .then(invitation => {
    console.log("Invitation created successfully:");
    console.log(JSON.stringify(invitation, null, 2));
    console.log("\n");
    // Store the token for the next example
    if (invitation && invitation.token) {
        // Example 2: Check if the invitation token is valid
        console.log("Example 2: Checking invitation validity");
        // Let's add extra debugging to understand what's happening
        console.log(`Using token: ${invitation.token}`);
        const invitationToCheck = {
            email: invitation.email,
            token: invitation.token,
            origin: 'http://localhost:8080'
        };
        // Before we call the check method, let's print out what we're sending
        console.log("Invitation check request:", JSON.stringify(invitationToCheck));
        return vgsdk.invitations.checkInvitation(invitationToCheck);
    }
    else {
        throw new Error("No token received in invitation response");
    }
})
    .then(validatedInvitation => {
    console.log("Invitation is valid:");
    console.log(JSON.stringify(validatedInvitation, null, 2));
    console.log("\n");
    // Example 3: Complete the registration with the invitation token
    console.log("Example 3: Completing registration");
    const registrationData = {
        invitation_token: validatedInvitation.token || "",
        password: "securePassword123",
        password_confirm: "securePassword123"
    };
    return vgsdk.invitations.completeRegistration(registrationData);
})
    .then(registrationResult => {
    console.log("Registration completed:");
    console.log(JSON.stringify(registrationResult, null, 2));
})
    .catch(error => {
    console.error("Error occurred:");
    console.error(error);
});
// Alternative example: Each step separately
// This is useful if the steps happen at different times/contexts
// Generate invitation link
function generateInvitationDemo(email, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invitationRequest = { email, role };
            const invitation = yield vgsdk.invitations.generateInvitationLink(invitationRequest);
            console.log("Generated invitation:", invitation);
            return invitation;
        }
        catch (error) {
            console.error("Failed to generate invitation:", error);
        }
    });
}
// Verify invitation token (typically done when user clicks link in email)
function verifyInvitationDemo(token_1) {
    return __awaiter(this, arguments, void 0, function* (token, email = "") {
        try {
            const invitationToCheck = {
                email: email,
                token: token,
                origin: 'http://localhost:8080'
            };
            const invitation = yield vgsdk.invitations.checkInvitation(invitationToCheck);
            console.log("Verified invitation:", invitation);
            return invitation;
        }
        catch (error) {
            console.error("Invalid invitation token:", error);
        }
    });
}
// Complete registration (after user has entered their desired password)
function completeRegistrationDemo(token, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const registrationData = {
                invitation_token: token,
                password: password,
                password_confirm: password
            };
            const result = yield vgsdk.invitations.completeRegistration(registrationData);
            console.log("Registration completed:", result);
            return result;
        }
        catch (error) {
            console.error("Failed to complete registration:", error);
        }
    });
}
// Uncomment to run the separate examples
/*
// Run the separate examples with a delay between them
generateInvitationDemo('another.user@example.com', 'ROLE_USER')
    .then(invitation => {
        if (invitation && invitation.token) {
            // Wait 2 seconds before verifying
            setTimeout(() => {
                verifyInvitationDemo(invitation.token!, invitation.email)
                    .then(verified => {
                        if (verified && verified.token) {
                            // Wait 2 seconds before completing registration
                            setTimeout(() => {
                                completeRegistrationDemo(verified.token!, 'mySecurePassword123');
                            }, 2000);
                        }
                    });
            }, 2000);
        }
    });
*/
