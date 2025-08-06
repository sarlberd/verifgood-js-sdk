import { ApiRequest } from "../core/ApiRequest";
export interface InvitationRequest {
    email: string;
    role: string;
    origin: string;
    sites?: number[];
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
    name: string;
    surname: string;
}
export declare class Invitations extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Generate an invitation link for a specific email and role
     * @param invitationRequest Object containing email, role, origin, and optionally sites for the invitee
     * @returns Promise with the invitation data including the URL and token
     * @example
     *   // Basic invitation without specific sites
     *   vgsdk.invitations.generateInvitationLink({
     *     email: 'verifgood@gmail.com',
     *     role: 'ROLE_ADMIN',
     *     origin: 'http://localhost:8080'
     *   })
     *     .then(invitation => console.log(invitation))
     *     .catch(error => console.error(error));
     *
     * @example
     *   // Invitation with specific sites
     *   vgsdk.invitations.generateInvitationLink({
     *     email: 'verifgood@gmail.com',
     *     role: 'ROLE_ADMIN',
     *     origin: 'http://localhost:8080',
     *     sites: [1, 5, 10]
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
     * Regenerate an invitation link for an existing invitation
     * @param id The ID of the invitation to regenerate
     * @returns Promise with the regenerated invitation link and receiver email
     * @example
     *   vgsdk.invitations.regenerateInvitationLink('123')
     *     .then(result => console.log(result))
     *     .catch(error => console.error(error));
     */
    regenerateInvitationLink(id: number): Promise<{
        invitation_link: string;
        receiver_email: string;
    }>;
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
