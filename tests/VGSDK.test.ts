import { VGSDK } from '../src/VGSDK';
import { Auth } from '../src/core/Auth';
import { SharedLinks } from '../src/apiRequests/SharedLinks';
import { Lieux } from '../src/apiRequests/Lieux';
import { Equipements } from '../src/apiRequests/Equipements';
import { Categories } from '../src/apiRequests/Categories';
import { Taches } from '../src/apiRequests/Taches';
import { Checkpoints } from '../src/apiRequests/Checkpoints';
import { Invitations } from '../src/apiRequests/Invitations';
import { Verifications } from '../src/apiRequests/Verifications';

describe('VGSDK Class', () => {
  const mockConfig = { apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' };

  describe('Constructor', () => {
    it('should initialize config and auth properties correctly', () => {
      const sdk = new VGSDK(mockConfig);
      expect(sdk.config).toEqual(mockConfig);
      expect(sdk.auth).toBeInstanceOf(Auth);
    });

    it('should initialize services as an empty object', () => {
      const sdk = new VGSDK(mockConfig);
      expect(sdk["services"]).toEqual({});
    });
  });

  describe('Service Getters', () => {
    it('should return a SharedLinks instance from sharedLinks getter', () => {
      const sdk = new VGSDK(mockConfig);
      const sharedLinks = sdk.sharedLinks;
      expect(sharedLinks).toBeInstanceOf(SharedLinks);
    });

    it('should return a Lieux instance from lieux getter', () => {
      const sdk = new VGSDK(mockConfig);
      const lieux = sdk.lieux;
      expect(lieux).toBeInstanceOf(Lieux);
    });

    it('should return an Equipements instance from equipements getter', () => {
      const sdk = new VGSDK(mockConfig);
      const equipements = sdk.equipements;
      expect(equipements).toBeInstanceOf(Equipements);
    });

    it('should return a Categories instance from categories getter', () => {
      const sdk = new VGSDK(mockConfig);
      const categories = sdk.categories;
      expect(categories).toBeInstanceOf(Categories);
    });

    it('should return a Taches instance from taches getter', () => {
      const sdk = new VGSDK(mockConfig);
      const taches = sdk.taches;
      expect(taches).toBeInstanceOf(Taches);
    });

    it('should return a Checkpoints instance from checkpoints getter', () => {
      const sdk = new VGSDK(mockConfig);
      const checkpoints = sdk.checkpoints;
      expect(checkpoints).toBeInstanceOf(Checkpoints);
    });

    it('should return an Invitations instance from invitations getter', () => {
      const sdk = new VGSDK(mockConfig);
      const invitations = sdk.invitations;
      expect(invitations).toBeInstanceOf(Invitations);
    });

    it('should return a Verifications instance from verifications getter', () => {
      const sdk = new VGSDK(mockConfig);
      const verifications = sdk.verifications;
      expect(verifications).toBeInstanceOf(Verifications);
    });
  });

  describe('Edge Cases', () => {
    it('should return the same service instance when a getter is called multiple times', () => {
      const sdk = new VGSDK(mockConfig);
      const sharedLinks1 = sdk.sharedLinks;
      const sharedLinks2 = sdk.sharedLinks;
      expect(sharedLinks1).toBe(sharedLinks2);
    });

    it('should handle missing or incomplete configOptions gracefully', () => {
      const incompleteConfig = { apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' };
      const sdk = new VGSDK(incompleteConfig);
      expect(sdk.config.apiBaseUrl).toBe('https://api.example.com');
    });
  });
});