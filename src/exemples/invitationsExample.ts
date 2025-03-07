import { VGSDK, SdkConfiguration } from "../index";
import { InvitationCompleteRegistration, InvitationRequest, InvitationCard } from "../apiRequests/Invitations";
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

// Example 1: Generate an invitation link for a new admin user
console.log("Example 1: Generating invitation link");
const invitationRequest: InvitationRequest = {
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
            
            const invitationToCheck: InvitationCard = {
                email: invitation.email,
                token: invitation.token,
                origin: 'http://localhost:8080'
            };
            
            // Before we call the check method, let's print out what we're sending
            console.log("Invitation check request:", JSON.stringify(invitationToCheck));
            
            return vgsdk.invitations.checkInvitation(invitationToCheck);
        } else {
            throw new Error("No token received in invitation response");
        }
    })
    .then(validatedInvitation => {
        console.log("Invitation is valid:");
        console.log(JSON.stringify(validatedInvitation, null, 2));
        console.log("\n");
        // Example 3: Complete the registration with the invitation token
        console.log("Example 3: Completing registration");
        
        const registrationData: InvitationCompleteRegistration = {
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
async function generateInvitationDemo(email: string, role: string) {
    try {
        const invitationRequest: InvitationRequest = { email, role };
        const invitation = await vgsdk.invitations.generateInvitationLink(invitationRequest);
        console.log("Generated invitation:", invitation);
        return invitation;
    } catch (error) {
        console.error("Failed to generate invitation:", error);
    }
}

// Verify invitation token (typically done when user clicks link in email)
async function verifyInvitationDemo(token: string, email: string = "") {
    try {
        const invitationToCheck: InvitationCard = {
            email: email,
            token: token,
            origin: 'http://localhost:8080'
        };
        const invitation = await vgsdk.invitations.checkInvitation(invitationToCheck);
        console.log("Verified invitation:", invitation);
        return invitation;
    } catch (error) {
        console.error("Invalid invitation token:", error);
    }
}

// Complete registration (after user has entered their desired password)
async function completeRegistrationDemo(token: string, password: string) {
    try {
        const registrationData: InvitationCompleteRegistration = {
            invitation_token: token,
            password: password,
            password_confirm: password
        };
        
        const result = await vgsdk.invitations.completeRegistration(registrationData);
        console.log("Registration completed:", result);
        return result;
    } catch (error) {
        console.error("Failed to complete registration:", error);
    }
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
