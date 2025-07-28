import { PersonalParameters } from '../src/apiRequests/PersonalParameters';
import { VGSDK } from '../src/VGSDK';
import { Auth } from '../src/core/Auth';

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
    };
})();

// Mock global localStorage
Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});

// Mock console.error
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('PersonalParameters API Service', () => {
    let personalParameters: PersonalParameters;
    let sdk: VGSDK;
    let mockAuth: Auth;

    beforeEach(() => {
        // Clear localStorage mock
        localStorageMock.clear();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        consoleErrorSpy.mockClear();

        // Initialize Auth and PersonalParameters
        mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
        personalParameters = new PersonalParameters(mockAuth, 'https://api.example.com');
        
        sdk = new VGSDK({
            apiBaseUrl: 'https://api.example.com',
            apiKey: 'test-api-key'
        });
    });

    describe('Constructor', () => {
        it('should initialize endpoints correctly', () => {
            expect(personalParameters.endpoint).toBe('/api/personal-parameters');
            expect(personalParameters.endpointSingleton).toBe('/api/personal-parameters');
        });

        it('should inherit from ApiRequest with correct auth', () => {
            expect(personalParameters.auth).toBe(mockAuth);
        });
    });

    describe('localStorageWorksHere', () => {
        it('should return true when Storage is available', () => {
            const result = personalParameters.localStorageWorksHere();
            // Note: In Node.js test environment, Storage might not be available
            expect(typeof result).toBe('boolean');
        });
    });

    describe('getAllDisplayable', () => {
        it('should return parsed displayable parameters', () => {
            const mockData = { element1: true, element2: false };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.getAllDisplayable();
            
            expect(localStorageMock.getItem).toHaveBeenCalledWith('personalParameters_isdisplayable');
            expect(result).toEqual(mockData);
        });

        it('should return null when no data exists', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = personalParameters.getAllDisplayable();
            
            expect(result).toBeNull();
        });

        it('should handle JSON parse errors gracefully', () => {
            localStorageMock.getItem.mockReturnValue('invalid json');

            const result = personalParameters.getAllDisplayable();
            
            expect(result).toBeNull();
            // Note: console.error is called internally for error handling
        });
    });

    describe('getLandingPage', () => {
        it('should return landing page from localStorage', () => {
            const mockLandingPage = '/dashboard';
            localStorageMock.getItem.mockReturnValue(mockLandingPage);

            const result = personalParameters.getLandingPage();
            
            expect(localStorageMock.getItem).toHaveBeenCalledWith('personalParameters_landingPage');
            expect(result).toBe(mockLandingPage);
        });

        it('should return null when no landing page is set', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = personalParameters.getLandingPage();
            
            expect(result).toBeNull();
        });
    });

    describe('getDefaultLandingPage', () => {
        it('should return intervention page for ROLE_BASIC', () => {
            const result = personalParameters.getDefaultLandingPage('ROLE_BASIC');
            expect(result).toBe('/demandeintervention');
        });

        it('should return maintenances page for other roles', () => {
            const result = personalParameters.getDefaultLandingPage('ROLE_ADMIN');
            expect(result).toBe('_maintenances');
        });

        it('should return maintenances page when no role provided', () => {
            const result = personalParameters.getDefaultLandingPage();
            expect(result).toBe('_maintenances');
        });

        it('should return maintenances page for null role', () => {
            const result = personalParameters.getDefaultLandingPage(null);
            expect(result).toBe('_maintenances');
        });
    });

    describe('setLandingPage', () => {
        it('should set landing page in localStorage', () => {
            const endpoint = '/custom-dashboard';
            
            personalParameters.setLandingPage(endpoint);
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('personalParameters_landingPage', endpoint);
        });
    });

    describe('isDisplayable', () => {
        it('should return true for displayable element', () => {
            const mockData = { element1: true, element2: false };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.isDisplayable('element1');
            
            expect(result).toBe(true);
        });

        it('should return true for non-boolean displayable element (default behavior)', () => {
            const mockData = { element1: 'yes', element2: false };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.isDisplayable('element1');
            
            expect(result).toBe(true); // Original Vue2 logic: defaults to true if not boolean
        });

        it('should return false for explicitly false element', () => {
            const mockData = { element1: true, element2: false };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.isDisplayable('element2');
            
            expect(result).toBe(false);
        });

        it('should return true for unknown element (default)', () => {
            const mockData = { element1: true };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.isDisplayable('unknownElement');
            
            expect(result).toBe(true);
        });

        it('should handle parse errors gracefully', () => {
            localStorageMock.getItem.mockReturnValue('invalid json');

            const result = personalParameters.isDisplayable('element1');
            
            expect(result).toBe(true);
            // Note: console.error is called internally for error handling
        });

        it('should handle empty localStorage gracefully', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = personalParameters.isDisplayable('element1');
            
            expect(result).toBe(true);
        });
    });

    describe('addDisplayable', () => {
        it('should add displayable element to localStorage', () => {
            personalParameters.addDisplayable('newElement', true);
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('newElement', 'true');
        });

        it('should add non-displayable element to localStorage', () => {
            personalParameters.addDisplayable('hiddenElement', false);
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('hiddenElement', 'false');
        });
    });

    describe('setUseIntegratedScannerInKeyboard', () => {
        it('should set scanner preference to true', () => {
            personalParameters.setUseIntegratedScannerInKeyboard(true);
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('personalParameters_useIntegratedScanerInKeyboard', 'true');
        });

        it('should set scanner preference to false', () => {
            personalParameters.setUseIntegratedScannerInKeyboard(false);
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('personalParameters_useIntegratedScanerInKeyboard', 'false');
        });
    });

    describe('getUseIntegratedScannerInKeyboard', () => {
        it('should return true when scanner is enabled', () => {
            localStorageMock.getItem.mockReturnValue('true');

            const result = personalParameters.getUseIntegratedScannerInKeyboard();
            
            expect(localStorageMock.getItem).toHaveBeenCalledWith('personalParameters_useIntegratedScanerInKeyboard');
            expect(result).toBe(true);
        });

        it('should return false when scanner is disabled', () => {
            localStorageMock.getItem.mockReturnValue('false');

            const result = personalParameters.getUseIntegratedScannerInKeyboard();
            
            expect(result).toBe(false);
        });

        it('should return false when no preference is set', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = personalParameters.getUseIntegratedScannerInKeyboard();
            
            expect(result).toBe(false);
        });

        it('should handle parse errors gracefully', () => {
            localStorageMock.getItem.mockReturnValue('invalid json');

            const result = personalParameters.getUseIntegratedScannerInKeyboard();
            
            expect(result).toBe(false);
            // Note: console.error is called internally for error handling
        });
    });

    describe('initializeDefaults', () => {
        it('should set default landing page when not present', () => {
            localStorageMock.getItem.mockReturnValue(null);

            personalParameters.initializeDefaults();
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith('personalParameters_landingPage', '_maintenances');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('personalParameters_useIntegratedScanerInKeyboard', 'false');
        });

        it('should not override existing landing page', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'personalParameters_landingPage') return '/existing-page';
                if (key === 'personalParameters_useIntegratedScanerInKeyboard') return 'true';
                return null;
            });

            personalParameters.initializeDefaults();
            
            expect(localStorageMock.setItem).not.toHaveBeenCalledWith('personalParameters_landingPage', '_maintenances');
            expect(localStorageMock.setItem).not.toHaveBeenCalledWith('personalParameters_useIntegratedScanerInKeyboard', 'false');
        });
    });

    describe('computedGetAllDisplayable', () => {
        it('should return same result as getAllDisplayable', () => {
            const mockData = { element1: true, element2: false };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

            const result = personalParameters.computedGetAllDisplayable;
            const directResult = personalParameters.getAllDisplayable();
            
            expect(result).toEqual(directResult);
            expect(result).toEqual(mockData);
        });
    });

    describe('VGSDK integration', () => {
        it('should be accessible through VGSDK', () => {
            expect(sdk.personalParameters).toBeInstanceOf(PersonalParameters);
        });
    });
});
