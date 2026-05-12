import { ApiRequest } from '../core/ApiRequest';
/**
 * PersonalParameters API Service
 *
 * Handles personal user parameters stored in localStorage.
 * These include display preferences, landing page settings,
 * scanner integration options, and UI element visibility.
 *
 * Migrated from: mixins_to_migrate/personnalParameters.js
 * Original methods: 9 methods + 1 computed property + beforeCreate lifecycle
 */
export declare class PersonalParameters extends ApiRequest {
    get endpoint(): string;
    get endpointSingleton(): string;
    /**
     * Check if localStorage is available in the browser
     * @returns {boolean} True if localStorage is supported
     */
    localStorageWorksHere(): boolean;
    /**
     * Get all displayable parameters from localStorage
     * @returns {any} Parsed displayable parameters object or null
     */
    getAllDisplayable(): any;
    /**
     * Get the landing page from localStorage
     * @returns {string|null} Landing page endpoint or null
     */
    getLandingPage(): string | null;
    /**
     * Get default landing page based on user role
     * @param {string|null} role - User role
     * @returns {string} Default landing page endpoint
     */
    getDefaultLandingPage(role?: string | null): string;
    /**
     * Set the landing page in localStorage
     * @param {string} endpoint - Landing page endpoint to set
     */
    setLandingPage(endpoint: string): void;
    /**
     * Check if a specific element/key is displayable
     * @param {string} key - The key to check for displayability
     * @returns {boolean} True if displayable, false otherwise
     */
    isDisplayable(key: string): boolean;
    /**
     * Add or update displayable status for an element
     * @param {string} element - Element identifier
     * @param {boolean} isDisplayable - Whether element should be displayable
     */
    addDisplayable(element: string, isDisplayable: boolean): void;
    /**
     * Set integrated scanner keyboard usage preference
     * @param {boolean} bool - Whether to use integrated scanner in keyboard
     */
    setUseIntegratedScannerInKeyboard(bool: boolean): void;
    /**
     * Get integrated scanner keyboard usage preference
     * @returns {boolean} True if integrated scanner should be used
     */
    getUseIntegratedScannerInKeyboard(): boolean;
    /**
     * Initialize default personal parameters in localStorage
     * This method should be called during application initialization
     * to ensure default values are set
     */
    initializeDefaults(): void;
    /**
     * Computed-style getter for all displayable parameters
     * Mimics the original computed property behavior
     * @returns {any} All displayable parameters
     */
    get computedGetAllDisplayable(): any;
}
