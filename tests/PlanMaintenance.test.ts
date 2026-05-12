import { PlanMaintenance } from '../src/apiRequests/PlanMaintenance';
import { Auth } from '../src/core/Auth';
import { VGSDK } from '../src/VGSDK';

describe('PlanMaintenance API Service', () => {
    let planMaintenance: PlanMaintenance;
    let sdk: VGSDK;
    let mockAuth: Auth;

    beforeEach(() => {
        mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
        planMaintenance = new PlanMaintenance(mockAuth, 'https://api.example.com');
        
        sdk = new VGSDK({
            apiBaseUrl: 'https://api.example.com',
            apiKey: 'test-api-key'
        });
    });

    describe('Constructor', () => {
        it('should initialize endpoints correctly', () => {
            expect(planMaintenance.endpoint).toBe('/api/plan/maintenance');
            expect(planMaintenance.endpointSingleton).toBe('/api/plan/maintenance');
        });

        it('should inherit from ApiRequest with correct auth', () => {
            expect(planMaintenance.auth).toBe(mockAuth);
        });
    });

    describe('getPrevventiveMaintenance', () => {
        it('should get preventive maintenance plan data', async () => {
            const mockResponse = {
                taches: [
                    { id: 1, title: 'Maintenance Task 1', dueDate: '2025-08-01' },
                    { id: 2, title: 'Maintenance Task 2', dueDate: '2025-08-15' }
                ],
                contrats: [
                    { id: 1, contractNumber: 'CONTRACT001', provider: 'Provider A' },
                    { id: 2, contractNumber: 'CONTRACT002', provider: 'Provider B' }
                ],
                metadatas: {
                    pagination: { page: 1, limit: 10 },
                    filters: { status: 'active' }
                }
            };

            const mockMetadatas = {
                get: jest.fn().mockReturnValue({ filter: 'test', sort: 'date' })
            };

            // Mock the get method
            jest.spyOn(planMaintenance, 'get').mockResolvedValue(mockResponse);

            const result = await planMaintenance.getPrevventiveMaintenance(
                '2025-08-01',
                mockMetadatas,
                'user123',
                'site456'
            );

            expect(planMaintenance.get).toHaveBeenCalledWith(
                '/api/plan/maintenance/preventive',
                mockMetadatas,
                {
                    userId: 'user123',
                    sites: 'site456',
                    focusedDate: '2025-08-01',
                    metadatas: { filter: 'test', sort: 'date' }
                }
            );

            expect(result).toEqual({
                taches: mockResponse.taches,
                contrats: mockResponse.contrats,
                metadatas: mockResponse.metadatas
            });

            expect(mockMetadatas.get).toHaveBeenCalled();
        });

        it('should handle empty response data', async () => {
            const mockResponse = {
                taches: [],
                contrats: [],
                metadatas: {}
            };

            const mockMetadatas = {
                get: jest.fn().mockReturnValue({})
            };

            jest.spyOn(planMaintenance, 'get').mockResolvedValue(mockResponse);

            const result = await planMaintenance.getPrevventiveMaintenance(
                '2025-08-01',
                mockMetadatas,
                'user123',
                'site456'
            );

            expect(result).toEqual({
                taches: [],
                contrats: [],
                metadatas: {}
            });
        });

        it('should reject on API error', async () => {
            const mockError = new Error('API Error');
            const mockMetadatas = {
                get: jest.fn().mockReturnValue({})
            };

            jest.spyOn(planMaintenance, 'get').mockRejectedValue(mockError);

            await expect(
                planMaintenance.getPrevventiveMaintenance(
                    '2025-08-01',
                    mockMetadatas,
                    'user123',
                    'site456'
                )
            ).rejects.toThrow('API Error');
        });

        it('should handle different date formats', async () => {
            const mockResponse = {
                taches: [],
                contrats: [],
                metadatas: {}
            };

            const mockMetadatas = {
                get: jest.fn().mockReturnValue({})
            };

            jest.spyOn(planMaintenance, 'get').mockResolvedValue(mockResponse);

            // Test with different date format
            await planMaintenance.getPrevventiveMaintenance(
                '2025-12-31T23:59:59.000Z',
                mockMetadatas,
                'user123',
                'site456'
            );

            expect(planMaintenance.get).toHaveBeenCalledWith(
                '/api/plan/maintenance/preventive',
                mockMetadatas,
                expect.objectContaining({
                    focusedDate: '2025-12-31T23:59:59.000Z'
                })
            );
        });

        it('should handle complex metadata objects', async () => {
            const mockResponse = {
                taches: [],
                contrats: [],
                metadatas: {}
            };

            const complexMetadata = {
                filters: { status: 'active', priority: 'high' },
                sorting: { field: 'dueDate', order: 'asc' },
                pagination: { page: 1, limit: 20 }
            };

            const mockMetadatas = {
                get: jest.fn().mockReturnValue(complexMetadata)
            };

            jest.spyOn(planMaintenance, 'get').mockResolvedValue(mockResponse);

            await planMaintenance.getPrevventiveMaintenance(
                '2025-08-01',
                mockMetadatas,
                'user123',
                'site456'
            );

            expect(planMaintenance.get).toHaveBeenCalledWith(
                '/api/plan/maintenance/preventive',
                mockMetadatas,
                expect.objectContaining({
                    metadatas: complexMetadata
                })
            );
        });

        it('should handle multiple sites restriction', async () => {
            const mockResponse = {
                taches: [],
                contrats: [],
                metadatas: {}
            };

            const mockMetadatas = {
                get: jest.fn().mockReturnValue({})
            };

            jest.spyOn(planMaintenance, 'get').mockResolvedValue(mockResponse);

            await planMaintenance.getPrevventiveMaintenance(
                '2025-08-01',
                mockMetadatas,
                'user123',
                'site1,site2,site3'
            );

            expect(planMaintenance.get).toHaveBeenCalledWith(
                '/api/plan/maintenance/preventive',
                mockMetadatas,
                expect.objectContaining({
                    sites: 'site1,site2,site3'
                })
            );
        });
    });

    describe('VGSDK integration', () => {
        it('should be accessible through VGSDK', () => {
            expect(sdk.planMaintenance).toBeInstanceOf(PlanMaintenance);
        });
    });
});
