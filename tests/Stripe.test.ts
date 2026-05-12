import { Stripe } from '../src/apiRequests/Stripe';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { StripCreateRequest, StripUpdateRequest } from '../src/types/Stripe';

describe('Stripe API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const stripe = new Stripe(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(stripe.endpoint).toBe('/api/stripe');
      expect(stripe.endpointSingleton).toBe('/api/stripe');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(stripe.auth).toBe(mockAuth);
      expect(stripe.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Custom Methods', () => {
    beforeEach(() => {
      jest.spyOn(stripe, 'get').mockResolvedValue({ success: true });
    });

    describe('openCustomerPortal', () => {
      it('should fetch portal URL and open in new tab', async () => {
        const mockPortalPayload = { url: 'https://billing.stripe.com/portal/123', success: true };
        jest.spyOn(stripe, 'get').mockResolvedValue(mockPortalPayload);
        
        // Mock window.open in global scope
        const mockWindowOpen = jest.fn();
        (global as any).window = {
          open: mockWindowOpen,
        };

        const result = await stripe.openCustomerPortal();

        expect(stripe.get).toHaveBeenCalledWith(
          '/api/stripe/customer/portal',
          expect.any(Metadatas),
          {}
        );
        expect(mockWindowOpen).toHaveBeenCalledWith('https://billing.stripe.com/portal/123', '_blank');
        expect(result).toEqual(mockPortalPayload);

        // Cleanup
        delete (global as any).window;
      });

      it('should handle missing URL gracefully', async () => {
        const mockPortalPayload = { success: true }; // No URL
        jest.spyOn(stripe, 'get').mockResolvedValue(mockPortalPayload);
        
        // Mock window.open in global scope
        const mockWindowOpen = jest.fn();
        (global as any).window = {
          open: mockWindowOpen,
        };

        const result = await stripe.openCustomerPortal();

        expect(stripe.get).toHaveBeenCalledWith(
          '/api/stripe/customer/portal',
          expect.any(Metadatas),
          {}
        );
        expect(mockWindowOpen).not.toHaveBeenCalled();
        expect(result).toEqual(mockPortalPayload);

        // Cleanup
        delete (global as any).window;
      });

      it('should work in non-browser environment', async () => {
        const mockPortalPayload = { url: 'https://billing.stripe.com/portal/123', success: true };
        jest.spyOn(stripe, 'get').mockResolvedValue(mockPortalPayload);
        
        // Ensure no window object exists
        delete (global as any).window;

        const result = await stripe.openCustomerPortal();

        expect(stripe.get).toHaveBeenCalledWith(
          '/api/stripe/customer/portal',
          expect.any(Metadatas),
          {}
        );
        expect(result).toEqual(mockPortalPayload);
      });
    });

    describe('getCustomerState', () => {
      it('should fetch customer state', async () => {
        const mockCustomerState = { 
          customerId: 'cus_123', 
          subscription: { status: 'active' },
          success: true 
        };
        jest.spyOn(stripe, 'get').mockResolvedValue(mockCustomerState);

        const result = await stripe.getCustomerState();

        expect(stripe.get).toHaveBeenCalledWith(
          '/api/stripe/customer',
          expect.any(Metadatas),
          {}
        );
        expect(result).toEqual(mockCustomerState);
      });
    });
  });

});
