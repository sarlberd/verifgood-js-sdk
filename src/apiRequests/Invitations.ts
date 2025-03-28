import {Metadatas} from "../core/Metadatas";
import {ApiRequest} from "../core/ApiRequest";

export interface InvitationRequest {
    email: string;
    role: string;
    origin:string;
}

export interface InvitationCard{
    id?: number;
    email: string;
    origin?: string | 'http://localhost:8080';
    role?: string;
    token: string;
    status?: string;
    Auth0OrganisationId?: string;
    created_at?: string;
    expires_at?: string;
}

export interface InvitationCompleteRegistration {
    invitation_token: string;
    password: string;
    password_confirm: string;
    name: string;
    surname: string;
}

export class Invitations extends ApiRequest {
    endpoint: string = '/api/invitations';
    endpointSingleton: string = '/api/invitations';
    
    /**
     * Generate an invitation link for a specific email and role
     * @param invitationRequest Object containing email and role for the invitee
     * @returns Promise with the invitation data including the URL and token
     * @example
     *   vgsdk.invitations.generateInvitationLink({
     *     email: 'verifgood@gmail.com',
     *     role: 'ROLE_ADMIN'
     *   })
     *     .then(invitation => console.log(invitation))
     *     .catch(error => console.error(error));
     */
    async generateInvitationLink(invitationRequest: InvitationRequest): Promise<InvitationCard> {
  
        // Change to properly use GET with query parameters
        const url = `${this.endpoint}/generate-invitation-link?email=${encodeURIComponent(invitationRequest.email)}&role=${encodeURIComponent(invitationRequest.role)}&origin=${encodeURIComponent(invitationRequest.origin)}`;
        const response = await this.apiRequest(url, 'GET', null);
        let token = response.invitation_link.split("/").pop();
        return {
            email: response.email,
            origin: response.origin,
            token: token
        };
    }

    /**
     * Check the validity of an invitation token
     * @param invitationCard The invitation card with token and origin
     * @returns Promise with the invitation data if valid
     * @example
     *   vgsdk.invitations.checkInvitation({
     *     token: 'abc123',
     *     email: 'user@example.com',
     *     origin: 'http://localhost:8080'
     *   })
     *     .then(invitation => console.log(invitation))
     *     .catch(error => console.error(error));
     */
    async checkInvitation(invitationCard: InvitationCard): Promise<InvitationCard> {
        try {
            // Make sure origin is properly URL-encoded
            const origin = encodeURIComponent(invitationCard.origin || 'http://localhost:8080');
            const token = invitationCard.token;
            
            // Ensure the URL is correctly formed
            const url = `${this.endpoint}/check-invitation/${token}?origin=${origin}`;
            
            // Add debug logging
            console.log(`Checking invitation with URL: ${url}`);
            
            const response = await this.apiRequest(url, 'GET', null);
            
            // If response doesn't appear to be a valid invitation
            if (!response || typeof response !== 'object') {
                console.warn('Invalid response format:', response);
                throw new Error('Invalid response format from server');
            }
            
            return response;
        } catch (error) {
            console.error('Error in checkInvitation:', error);
            
            // Return a minimal valid object to avoid breaking the chain
            // You can modify this based on your application's error handling needs
            return {
                email: invitationCard.email || '',
                token: invitationCard.token,
                status: 'error',
                role: 'unknown'
            };
        }
    }
    
    /**
     * Regenerate an invitation link for an existing invitation
     * @param id The ID of the invitation to regenerate
     * @returns Promise with the regenerated invitation link and receiver email
     * @example
     *   vgsdk.invitations.regenerateInvitationLink('123')
     *     .then(result => console.log(result))
     *     .catch(error => console.error(error));
     */
    async regenerateInvitationLink(id: number): Promise<{invitation_link: string, receiver_email: string}> {
        let origin = location.origin;

        const url = `${this.endpoint}/regenerate-invitation-link/${id}?origin=${origin}`;
        const response = await this.apiRequest(url, 'GET', null);
        return {
            invitation_link: response.invitation_link,
            receiver_email: response.receiver_email
        };
    }

    /**
     * Complete the registration process for a user with an invitation token
     * @param registration Object containing invitation token and password details
     * @returns Promise with the registration result
     * @example
     *   vgsdk.invitations.completeRegistration({
     *     invitation_token: '92131fa4fc98fe6e12a5a35129f167f12ec1eabd6279928b5c42a9aa7a49cab9',
     *     password: 'securePassword123',
     *     password_confirm: 'securePassword123'
     *   })
     *     .then(result => console.log(result))
     *     .catch(error => console.error(error));
     */
    async completeRegistration(registration : InvitationCompleteRegistration): Promise<any> {
        const response = await this.apiRequest(`${this.endpoint}/complete-registration`, 'POST', registration);
        return response;
    }
}