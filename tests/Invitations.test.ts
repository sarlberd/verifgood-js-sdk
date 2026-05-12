import { Invitations, InvitationRequest, InvitationCard, InvitationCompleteRegistration } from '../src/apiRequests/Invitations';
import { Auth } from '../src/core/Auth';

describe('Invitations', () => {
    let invitations: Invitations;
    let mockApiRequest: jest.MockedFunction<any>;
    let mockAuth: Auth;

    beforeEach(() => {
        mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
        invitations = new Invitations(mockAuth, 'https://api.example.com');
        mockApiRequest = jest.fn();
        invitations.apiRequest = mockApiRequest;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateInvitationLink', () => {
        it('should generate invitation link without sites parameter', async () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080'
            };

            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/abc123',
                email: 'test@example.com',
                origin: 'http://localhost:8080'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            const result = await invitations.generateInvitationLink(invitationRequest);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/generate-invitation-link?email=test%40example.com&role=ROLE_USER&origin=http%3A%2F%2Flocalhost%3A8080',
                'GET',
                null
            );

            expect(result).toEqual({
                email: 'test@example.com',
                origin: 'http://localhost:8080',
                token: 'abc123'
            });
        });

        it('should generate invitation link with single site parameter', async () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080',
                sites: [1]
            };

            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/abc123',
                email: 'test@example.com',
                origin: 'http://localhost:8080'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            const result = await invitations.generateInvitationLink(invitationRequest);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/generate-invitation-link?email=test%40example.com&role=ROLE_USER&origin=http%3A%2F%2Flocalhost%3A8080&sites=%5B1%5D',
                'GET',
                null
            );

            expect(result).toEqual({
                email: 'test@example.com',
                origin: 'http://localhost:8080',
                token: 'abc123'
            });
        });

        it('should generate invitation link with multiple sites parameter', async () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_ADMIN',
                origin: 'https://app.verifgood.com',
                sites: [1, 5, 10]
            };

            const mockResponse = {
                invitation_link: 'https://app.verifgood.com/invitation/xyz789',
                email: 'test@example.com',
                origin: 'https://app.verifgood.com'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            const result = await invitations.generateInvitationLink(invitationRequest);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/generate-invitation-link?email=test%40example.com&role=ROLE_ADMIN&origin=https%3A%2F%2Fapp.verifgood.com&sites=%5B1%2C5%2C10%5D',
                'GET',
                null
            );

            expect(result).toEqual({
                email: 'test@example.com',
                origin: 'https://app.verifgood.com',
                token: 'xyz789'
            });
        });

        it('should not include sites parameter when sites array is empty', async () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080',
                sites: []
            };

            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/abc123',
                email: 'test@example.com',
                origin: 'http://localhost:8080'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            await invitations.generateInvitationLink(invitationRequest);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/generate-invitation-link?email=test%40example.com&role=ROLE_USER&origin=http%3A%2F%2Flocalhost%3A8080',
                'GET',
                null
            );
        });

        it('should properly encode special characters in email', async () => {
            const invitationRequest: InvitationRequest = {
                email: 'test+user@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080'
            };

            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/abc123',
                email: 'test+user@example.com',
                origin: 'http://localhost:8080'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            await invitations.generateInvitationLink(invitationRequest);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/generate-invitation-link?email=test%2Buser%40example.com&role=ROLE_USER&origin=http%3A%2F%2Flocalhost%3A8080',
                'GET',
                null
            );
        });
    });

    describe('checkInvitation', () => {
        it('should check invitation successfully', async () => {
            const invitationCard: InvitationCard = {
                token: 'abc123',
                email: 'test@example.com',
                origin: 'http://localhost:8080'
            };

            const mockResponse = {
                id: 1,
                email: 'test@example.com',
                origin: 'http://localhost:8080',
                role: 'ROLE_USER',
                token: 'abc123',
                status: 'pending'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            const result = await invitations.checkInvitation(invitationCard);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/check-invitation/abc123?origin=http%3A%2F%2Flocalhost%3A8080',
                'GET',
                null
            );

            expect(result).toEqual(mockResponse);
        });

        it('should handle error in checkInvitation and return fallback object', async () => {
            const invitationCard: InvitationCard = {
                token: 'invalid-token',
                email: 'test@example.com',
                origin: 'http://localhost:8080'
            };

            mockApiRequest.mockRejectedValue(new Error('Invalid token'));

            const result = await invitations.checkInvitation(invitationCard);

            expect(result).toEqual({
                email: 'test@example.com',
                token: 'invalid-token',
                status: 'error',
                role: 'unknown'
            });
        });

        it('should use default origin when not provided', async () => {
            const invitationCard: InvitationCard = {
                token: 'abc123',
                email: 'test@example.com'
            };

            const mockResponse = {
                id: 1,
                email: 'test@example.com',
                token: 'abc123',
                status: 'pending'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            await invitations.checkInvitation(invitationCard);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/check-invitation/abc123?origin=http%3A%2F%2Flocalhost%3A8080',
                'GET',
                null
            );
        });
    });

    describe('regenerateInvitationLink', () => {
        it('should regenerate invitation link', async () => {
            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/new-token-123',
                receiver_email: 'test@example.com'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            // Mock location object
            const mockLocation = {
                origin: 'http://localhost:8080'
            };
            (global as any).location = mockLocation;

            const result = await invitations.regenerateInvitationLink(123);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/regenerate-invitation-link/123?origin=http://localhost:8080',
                'GET',
                null
            );

            expect(result).toEqual({
                invitation_link: 'http://localhost:8080/invitation/new-token-123',
                receiver_email: 'test@example.com'
            });
        });

        it('should use default origin when location is not available', async () => {
            const mockResponse = {
                invitation_link: 'http://localhost:8080/invitation/new-token-123',
                receiver_email: 'test@example.com'
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            // Clear location object
            (global as any).location = undefined;

            await invitations.regenerateInvitationLink(123);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/regenerate-invitation-link/123?origin=http://localhost:8080',
                'GET',
                null
            );
        });
    });

    describe('completeRegistration', () => {
        it('should complete registration successfully', async () => {
            const registration: InvitationCompleteRegistration = {
                invitation_token: 'abc123',
                password: 'securePassword123',
                password_confirm: 'securePassword123',
                name: 'John',
                surname: 'Doe'
            };

            const mockResponse = {
                success: true,
                user: {
                    id: 1,
                    email: 'john.doe@example.com',
                    name: 'John',
                    surname: 'Doe'
                }
            };

            mockApiRequest.mockResolvedValue(mockResponse);

            const result = await invitations.completeRegistration(registration);

            expect(mockApiRequest).toHaveBeenCalledWith(
                '/api/invitations/complete-registration',
                'POST',
                registration
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('Interface validation', () => {
        it('should validate InvitationRequest interface with required fields', () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080'
            };

            expect(invitationRequest.email).toBe('test@example.com');
            expect(invitationRequest.role).toBe('ROLE_USER');
            expect(invitationRequest.origin).toBe('http://localhost:8080');
            expect(invitationRequest.sites).toBeUndefined();
        });

        it('should validate InvitationRequest interface with optional sites field', () => {
            const invitationRequest: InvitationRequest = {
                email: 'test@example.com',
                role: 'ROLE_USER',
                origin: 'http://localhost:8080',
                sites: [1, 2, 3]
            };

            expect(invitationRequest.sites).toEqual([1, 2, 3]);
            expect(Array.isArray(invitationRequest.sites)).toBe(true);
            expect(invitationRequest.sites?.every(site => typeof site === 'number')).toBe(true);
        });

        it('should validate InvitationCard interface', () => {
            const invitationCard: InvitationCard = {
                id: 1,
                email: 'test@example.com',
                origin: 'http://localhost:8080',
                role: 'ROLE_USER',
                token: 'abc123',
                status: 'pending',
                Auth0OrganisationId: 'org_123',
                created_at: '2025-08-04T10:00:00Z',
                expires_at: '2025-08-11T10:00:00Z'
            };

            expect(invitationCard.id).toBe(1);
            expect(invitationCard.email).toBe('test@example.com');
            expect(invitationCard.token).toBe('abc123');
        });

        it('should validate InvitationCompleteRegistration interface', () => {
            const registration: InvitationCompleteRegistration = {
                invitation_token: 'abc123',
                password: 'securePassword123',
                password_confirm: 'securePassword123',
                name: 'John',
                surname: 'Doe'
            };

            expect(registration.invitation_token).toBe('abc123');
            expect(registration.password).toBe('securePassword123');
            expect(registration.name).toBe('John');
            expect(registration.surname).toBe('Doe');
        });
    });
});
