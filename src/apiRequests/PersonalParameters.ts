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
export class PersonalParameters extends ApiRequest {
    
    public get endpoint(): string {
        return '/api/personal-parameters';
    }
    
    public get endpointSingleton(): string {
        return '/api/personal-parameters';
    }

    /**
     * Check if localStorage is available in the browser
     * @returns {boolean} True if localStorage is supported
     */
    localStorageWorksHere(): boolean {
        // TODO: Preserve original Vue2 logic for localStorage detection
        // Original: return typeof(Storage) !== "undefined";
        return typeof(Storage) !== "undefined";
    }

    /**
     * Get all displayable parameters from localStorage
     * @returns {any} Parsed displayable parameters object or null
     */
    getAllDisplayable(): any {
        // TODO: Preserve original Vue2 logic for retrieving displayable parameters
        // Original: return JSON.parse(localStorage.getItem("personalParameters_isdisplayable"));
        try {
            const stored = localStorage.getItem("personalParameters_isdisplayable");
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error parsing displayable parameters:', error);
            return null;
        }
    }

    /**
     * Get the landing page from localStorage
     * @returns {string|null} Landing page endpoint or null
     */
    getLandingPage(): string | null {
        // TODO: Preserve original Vue2 logic for landing page retrieval
        // Original: return localStorage.getItem("personalParameters_landingPage");
        return localStorage.getItem("personalParameters_landingPage");
    }

    /**
     * Get default landing page based on user role
     * @param {string|null} role - User role
     * @returns {string} Default landing page endpoint
     */
    getDefaultLandingPage(role: string | null = null): string {
        // TODO: Preserve original Vue2 role-based landing page logic
        // Original: if(role=="ROLE_BASIC") return "/demandeintervention"; return "_maintenances";
        if (role === "ROLE_BASIC") {
            return "/demandeintervention";
        }
        return "_maintenances";
    }

    /**
     * Set the landing page in localStorage
     * @param {string} endpoint - Landing page endpoint to set
     */
    setLandingPage(endpoint: string): void {
        // TODO: Preserve original Vue2 logic for setting landing page
        // Original: localStorage.setItem('personalParameters_landingPage',endpoint);
        localStorage.setItem('personalParameters_landingPage', endpoint);
    }

    /**
     * Check if a specific element/key is displayable
     * @param {string} key - The key to check for displayability
     * @returns {boolean} True if displayable, false otherwise
     */
    isDisplayable(key: string): boolean {
        // TODO: Preserve original Vue2 logic for checking displayable status
        // Original: var displayableList = JSON.parse(localStorage.getItem("personalParameters_isdisplayable"));
        // var debug = displayableList[key] && typeof(displayableList[key]) === "boolean" ? displayableList[key] : true;
        try {
            const stored = localStorage.getItem("personalParameters_isdisplayable");
            if (!stored) return true; // Default to displayable if no config exists
            
            const displayableList = JSON.parse(stored);
            // Original logic: only return the actual value if it exists AND is boolean, otherwise default to true
            const result = displayableList.hasOwnProperty(key) && typeof(displayableList[key]) === "boolean" 
                ? displayableList[key] 
                : true;
            // Note: Original had this.$forceUpdate() - not needed in framework-agnostic context
            return result;
        } catch (error) {
            console.error('Error checking displayable status:', error);
            return true; // Default to displayable
        }
    }

    /**
     * Add or update displayable status for an element
     * @param {string} element - Element identifier
     * @param {boolean} isDisplayable - Whether element should be displayable
     */
    addDisplayable(element: string, isDisplayable: boolean): void {
        // TODO: Preserve original Vue2 logic for adding displayable elements
        // Original: localStorage.setItem(element, isDisplayable);
        // Note: Original logic seems to store individual keys - preserving as-is
        localStorage.setItem(element, isDisplayable.toString());
    }

    /**
     * Set integrated scanner keyboard usage preference
     * @param {boolean} bool - Whether to use integrated scanner in keyboard
     */
    setUseIntegratedScannerInKeyboard(bool: boolean): void {
        // TODO: Preserve original Vue2 logic for scanner preference
        // Original: localStorage.setItem('personalParameters_useIntegratedScanerInKeyboard',bool);
        localStorage.setItem('personalParameters_useIntegratedScanerInKeyboard', bool.toString());
    }

    /**
     * Get integrated scanner keyboard usage preference
     * @returns {boolean} True if integrated scanner should be used
     */
    getUseIntegratedScannerInKeyboard(): boolean {
        // TODO: Preserve original Vue2 logic for getting scanner preference
        // Original: return JSON.parse(localStorage.getItem('personalParameters_useIntegratedScanerInKeyboard'));
        try {
            const stored = localStorage.getItem('personalParameters_useIntegratedScanerInKeyboard');
            return stored ? JSON.parse(stored) : false;
        } catch (error) {
            console.error('Error parsing scanner preference:', error);
            return false;
        }
    }

    /**
     * Initialize default personal parameters in localStorage
     * This method should be called during application initialization
     * to ensure default values are set
     */
    initializeDefaults(): void {
        // TODO: Preserve original Vue2 beforeCreate lifecycle logic
        // Original beforeCreate hook logic for setting defaults
        if (!localStorage.getItem('personalParameters_landingPage')) {
            localStorage.setItem('personalParameters_landingPage', "_maintenances");
        }
        if (!localStorage.getItem('personalParameters_useIntegratedScanerInKeyboard')) {
            localStorage.setItem('personalParameters_useIntegratedScanerInKeyboard', 'false');
        }
    }

    /**
     * Computed-style getter for all displayable parameters
     * Mimics the original computed property behavior
     * @returns {any} All displayable parameters
     */
    get computedGetAllDisplayable(): any {
        // TODO: Preserve original Vue2 computed property logic
        // Original: return this.personalParameters_getAllDisplayable();
        return this.getAllDisplayable();
    }
}
