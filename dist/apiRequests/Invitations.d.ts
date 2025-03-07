import { ApiRequest } from "../core/ApiRequest";
export interface InvitationRequest {
    email: string;
    role: string;
}
export interface InvitationCard {
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
}
export declare class Invitations extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
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
    generateInvitationLink(invitationRequest: InvitationRequest): Promise<InvitationCard>;
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
    checkInvitation(invitationCard: InvitationCard): Promise<InvitationCard>;
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
    completeRegistration(registration: InvitationCompleteRegistration): Promise<any>;
}
