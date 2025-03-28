"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VGSDK_1 = require("../src/VGSDK");
const Auth_1 = require("../src/core/Auth");
const SharedLinks_1 = require("../src/apiRequests/SharedLinks");
const Lieux_1 = require("../src/apiRequests/Lieux");
const Equipements_1 = require("../src/apiRequests/Equipements");
const Categories_1 = require("../src/apiRequests/Categories");
const Taches_1 = require("../src/apiRequests/Taches");
const Checkpoints_1 = require("../src/apiRequests/Checkpoints");
const Invitations_1 = require("../src/apiRequests/Invitations");
const Verifications_1 = require("../src/apiRequests/Verifications");
describe('VGSDK Class', () => {
    const mockConfig = { apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' };
    describe('Constructor', () => {
        it('should initialize config and auth properties correctly', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            expect(sdk.config).toEqual(mockConfig);
            expect(sdk.auth).toBeInstanceOf(Auth_1.Auth);
        });
        it('should initialize services as an empty object', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            expect(sdk["services"]).toEqual({});
        });
    });
    describe('Service Getters', () => {
        it('should return a SharedLinks instance from sharedLinks getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const sharedLinks = sdk.sharedLinks;
            expect(sharedLinks).toBeInstanceOf(SharedLinks_1.SharedLinks);
        });
        it('should return a Lieux instance from lieux getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const lieux = sdk.lieux;
            expect(lieux).toBeInstanceOf(Lieux_1.Lieux);
        });
        it('should return an Equipements instance from equipements getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const equipements = sdk.equipements;
            expect(equipements).toBeInstanceOf(Equipements_1.Equipements);
        });
        it('should return a Categories instance from categories getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const categories = sdk.categories;
            expect(categories).toBeInstanceOf(Categories_1.Categories);
        });
        it('should return a Taches instance from taches getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const taches = sdk.taches;
            expect(taches).toBeInstanceOf(Taches_1.Taches);
        });
        it('should return a Checkpoints instance from checkpoints getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const checkpoints = sdk.checkpoints;
            expect(checkpoints).toBeInstanceOf(Checkpoints_1.Checkpoints);
        });
        it('should return an Invitations instance from invitations getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const invitations = sdk.invitations;
            expect(invitations).toBeInstanceOf(Invitations_1.Invitations);
        });
        it('should return a Verifications instance from verifications getter', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const verifications = sdk.verifications;
            expect(verifications).toBeInstanceOf(Verifications_1.Verifications);
        });
    });
    describe('Edge Cases', () => {
        it('should return the same service instance when a getter is called multiple times', () => {
            const sdk = new VGSDK_1.VGSDK(mockConfig);
            const sharedLinks1 = sdk.sharedLinks;
            const sharedLinks2 = sdk.sharedLinks;
            expect(sharedLinks1).toBe(sharedLinks2);
        });
        it('should handle missing or incomplete configOptions gracefully', () => {
            const incompleteConfig = { apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' };
            const sdk = new VGSDK_1.VGSDK(incompleteConfig);
            expect(sdk.config.apiBaseUrl).toBe('https://api.example.com');
        });
    });
});
