/**
 * PersonalParameters Types
 * 
 * TypeScript interfaces for personal user parameters and localStorage management.
 * Supports display preferences, landing pages, scanner settings, and UI visibility.
 * 
 * Migrated from: mixins_to_migrate/personnalParameters.js
 */

/**
 * Personal parameter configuration object
 */
export interface PersonalParameter {
    key: string;
    value: any;
    isDisplayable?: boolean;
}

/**
 * Displayable parameters configuration
 * Maps element keys to their visibility status
 */
export interface DisplayableParameters {
    [key: string]: boolean;
}

/**
 * Landing page configuration
 */
export interface LandingPageConfig {
    endpoint: string;
    role?: string;
    isDefault?: boolean;
}

/**
 * Scanner integration preferences
 */
export interface ScannerPreferences {
    useIntegratedScannerInKeyboard: boolean;
    scannerMode?: string;
    autoSubmit?: boolean;
}

/**
 * Complete personal parameters configuration
 */
export interface PersonalParametersConfig {
    landingPage: string;
    displayableParameters: DisplayableParameters;
    scannerPreferences: ScannerPreferences;
    customSettings?: { [key: string]: any };
}

/**
 * User role enumeration for landing page defaults
 */
export enum UserRole {
    BASIC = 'ROLE_BASIC',
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
    MANAGER = 'ROLE_MANAGER'
}

/**
 * Default landing page mappings by role
 */
export interface DefaultLandingPages {
    [UserRole.BASIC]: string;
    [UserRole.ADMIN]: string;
    [UserRole.USER]: string;
    [UserRole.MANAGER]: string;
}

/**
 * LocalStorage operation result
 */
export interface LocalStorageResult {
    success: boolean;
    value?: any;
    error?: string;
}

/**
 * Personal parameters initialization options
 */
export interface PersonalParametersInitOptions {
    defaultLandingPage?: string;
    defaultScannerPreferences?: Partial<ScannerPreferences>;
    customDefaults?: { [key: string]: any };
}
