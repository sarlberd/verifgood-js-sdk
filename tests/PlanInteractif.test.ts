import { PlanInteractif } from '../src/apiRequests/PlanInteractif';
import { Auth } from '../src/core/Auth';
import { VGSDK } from '../src/VGSDK';

// Mock File constructor for CSV import tests
global.File = class File {
    name: string;
    type: string;
    content: string;

    constructor(content: string[], fileName: string, options: any = {}) {
        this.name = fileName;
        this.type = options.type || 'text/csv';
        this.content = content.join('');
    }
} as any;

// Mock FileReader
global.FileReader = class FileReader {
    onload: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;
    result: string | null = null;

    readAsText(file: any) {
        setTimeout(() => {
            this.result = file.content;
            if (this.onload) {
                this.onload({ target: { result: this.result } });
            }
        }, 0);
    }
} as any;

// Mock window and document for Excel export
Object.defineProperty(global, 'window', {
    value: {
        URL: {
            createObjectURL: jest.fn(() => 'mock-url'),
            revokeObjectURL: jest.fn()
        }
    }
});

Object.defineProperty(global, 'document', {
    value: {
        createElement: jest.fn((tagName) => {
            if (tagName === 'a') {
                return {
                    href: '',
                    setAttribute: jest.fn(),
                    click: jest.fn()
                };
            }
            return {};
        }),
        body: {
            appendChild: jest.fn(),
            removeChild: jest.fn()
        }
    }
});

describe('PlanInteractif API Service', () => {
    let planInteractif: PlanInteractif;
    let sdk: VGSDK;
    let mockAuth: Auth;

    beforeEach(() => {
        mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
        planInteractif = new PlanInteractif(mockAuth, 'https://api.example.com');
        
        sdk = new VGSDK({
            apiBaseUrl: 'https://api.example.com',
            apiKey: 'test-api-key'
        });
    });

    describe('Constructor', () => {
        it('should initialize endpoints correctly', () => {
            expect(planInteractif.endpoint).toBe('/api/plan-interactif');
            expect(planInteractif.endpointSingleton).toBe('/api/plan-interactif');
        });

        it('should inherit from ApiRequest with correct auth', () => {
            expect(planInteractif.auth).toBe(mockAuth);
        });
    });

    describe('convertDataToFeature', () => {
        it('should convert data to GeoJSON feature', () => {
            const data = {
                id: 1,
                libel_lieu: "Piece 1",
                coordX: 10.5,
                coordY: 20.3
            };

            const result = planInteractif.convertDataToFeature(data);

            expect(result).toEqual({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [10.5, 20.3]
                },
                "properties": data,
                "id": null
            });
        });

        it('should handle missing coordinates', () => {
            const data = { id: 1, libel_lieu: "Piece 1" };

            const result = planInteractif.convertDataToFeature(data);

            expect(result.type).toBe("Feature");
            expect(result.properties).toEqual(data);
            expect(result.id).toBeNull();
        });
    });

    describe('updateFeaturePosition', () => {
        it('should update feature position with new coordinates', () => {
            const feature = {
                id: "test-feature",
                properties: { libel_lieu: "Test Room", existing: "data" },
                geometry: { type: "Point", coordinates: [0, 0] }
            };
            const latlng = { lat: 45.5, lng: -73.6 };

            const result = planInteractif.updateFeaturePosition(feature, latlng);

            expect(result).toEqual({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-73.6, 45.5]
                },
                "properties": {
                    libel_lieu: "Test Room",
                    existing: "data",
                    coordX: 45.5,
                    coordY: -73.6
                },
                "id": "test-feature"
            });
        });
    });

    describe('getPiecesACreer', () => {
        it('should extract pieces to create from GeoJSON draft', () => {
            const geoJsonDraft = {
                features: [
                    {
                        properties: {
                            libel_lieu: "New Room 1",
                            categorie: { libelleCatgorie: "Office" },
                            codeUn: "QR001",
                            service: "IT"
                        }
                    },
                    {
                        properties: {
                            id: 123,
                            libel_lieu: "Existing Room"
                        }
                    },
                    {
                        properties: {
                            libel_lieu: "New Room 2",
                            categorie: { libelleCatgorie: "Meeting" },
                            codeUn: "QR002",
                            service: "Admin"
                        }
                    }
                ]
            };
            const etage = { id: 5 };
            const appID = "test-app-123";

            const result = planInteractif.getPiecesACreer(geoJsonDraft, etage, appID);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                libel_lieu: "New Room 1",
                type_lieu: "Piece",
                idLieuParent_id: 5,
                categorie: { libelleCatgorie: "Office" },
                codeUn: "QR001",
                userId: "test-app-123",
                service: "IT"
            });
        });

        it('should return empty array when no pieces to create', () => {
            const geoJsonDraft = {
                features: [
                    { properties: { id: 1, libel_lieu: "Existing Room" } }
                ]
            };
            const etage = { id: 5 };
            const appID = "test-app";

            const result = planInteractif.getPiecesACreer(geoJsonDraft, etage, appID);

            expect(result).toEqual([]);
        });
    });

    describe('reaffectePiecesAuxMarkers', () => {
        it('should reassign pieces to markers based on libel_lieu and codeUn', () => {
            const pieces = [
                { id: 1, libel_lieu: "Room A", codeUn: "QR001", newData: "updated" },
                { id: 2, libel_lieu: "Room B", codeUn: "QR002", newData: "updated" }
            ];
            const geoJson = {
                features: [
                    { properties: { libel_lieu: "Room A", codeUn: "QR001", oldData: "original" } },
                    { properties: { libel_lieu: "Room C", codeUn: "QR003", oldData: "original" } },
                    { properties: { libel_lieu: "Room B", codeUn: "QR002", oldData: "original" } }
                ]
            };

            const result = planInteractif.reaffectePiecesAuxMarkers(pieces, geoJson);

            expect(result.features[0].properties).toEqual(pieces[0]);
            expect(result.features[1].properties.oldData).toBe("original"); // Not reassigned
            expect(result.features[2].properties).toEqual(pieces[1]);
        });
    });

    describe('getElementsPositionneesEtNonPositionnees', () => {
        it('should separate positioned and non-positioned elements', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            const collection = [
                { id: 1, name: "Item 1" },
                { id: 2, name: "Item 2" },
                { id: 3, name: "Item 3" }
            ];
            const geoJson = {
                features: [
                    { properties: { id: 1 } },
                    { properties: { id: 3 } }
                ]
            };

            const [positioned, nonPositioned] = planInteractif.getElementsPositionneesEtNonPositionnees(collection, geoJson);

            expect(positioned).toHaveLength(2);
            expect(nonPositioned).toHaveLength(1);
            expect(positioned).toEqual([
                { id: 1, name: "Item 1" },
                { id: 3, name: "Item 3" }
            ]);
            expect(nonPositioned).toEqual([
                { id: 2, name: "Item 2" }
            ]);
            expect(consoleSpy).toHaveBeenCalledWith("PlanInteractif_getElementsPositionneesEtNonPositionnees", collection, geoJson);
            
            consoleSpy.mockRestore();
        });
    });

    describe('newGeoJsonFeature', () => {
        it('should create new GeoJSON feature from data and coordinates', () => {
            const datas = {
                uid: "feature-123",
                libel_lieu: "New Feature",
                type: "equipment"
            };
            const latlng = { lat: 45.0, lng: -75.0 };

            const result = planInteractif.newGeoJsonFeature(datas, latlng);

            expect(result).toEqual({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-75.0, 45.0]
                },
                "properties": {
                    uid: "feature-123",
                    libel_lieu: "New Feature",
                    type: "equipment",
                    coordX: 45.0,
                    coordY: -75.0
                },
                "id": "feature-123"
            });
        });
    });

    describe('geoJsonDeepCopy', () => {
        it('should create deep copy of GeoJSON', () => {
            const original = {
                type: "FeatureCollection",
                features: [
                    { type: "Feature", properties: { id: 1 } },
                    { type: "Feature", properties: { id: 2 } }
                ]
            };

            const copy = planInteractif.geoJsonDeepCopy(original);

            expect(copy).toEqual(original);
            expect(copy).not.toBe(original);
            expect(copy.features).not.toBe(original.features);
        });

        it('should handle empty GeoJSON', () => {
            const original = { type: "FeatureCollection", features: [] };

            const copy = planInteractif.geoJsonDeepCopy(original);

            expect(copy).toEqual(original);
            expect(copy.features).toEqual([]);
        });
    });

    describe('exportPiecesACreerExcel', () => {
        it('should export pieces to create as Excel', () => {
            const exportExcelSpy = jest.spyOn(planInteractif, 'exportExcel').mockImplementation();
            
            const geoJson = {
                features: [
                    {
                        properties: {
                            libel_lieu: "New Room 1",
                            codeUn: "QR001",
                            categorie: { libelleCatgorie: "Office" },
                            service: "IT"
                        }
                    },
                    {
                        properties: {
                            id: 123,
                            libel_lieu: "Existing Room"
                        }
                    }
                ]
            };
            const etage = { path: "/Site1/Building1/Floor1" };

            planInteractif.exportPiecesACreerExcel(geoJson, etage, "test_export_");

            expect(exportExcelSpy).toHaveBeenCalledWith(
                [["New Room 1", "QR001", "Office", "IT", "Site1", "Building1", "Floor1"]],
                ["Pièce", "QRCODE", "Catégorie", "Service", "Site", "Batiment", "Etage"],
                "test_export_"
            );
            
            exportExcelSpy.mockRestore();
        });
    });



    describe('importCsv', () => {
        it('should import and parse CSV file correctly', async () => {
            const csvContent = [
                "Piece,QRCODE,coordX,coordY\n",
                "Room1,QR001,10,20\n",
                "Room2,QR002,30,40"
            ];
            const file = new (global.File as any)(csvContent, 'test.csv', { type: 'text/csv' });

            const result = await planInteractif.importCsv(file);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                Piece: "Room1",
                QRCODE: "QR001",
                coordX: 10,
                coordY: 20
            });
            expect(result[1]).toEqual({
                Piece: "Room2",
                QRCODE: "QR002",
                coordX: 30,
                coordY: 40
            });
        });

        it('should handle CSV with special characters and sanitize data', async () => {
            const csvContent = [
                'Piece Name,QR "CODE",coordX,coordY\n',
                '"Room 1/Test",QR\'001,15,25'
            ];
            const file = new (global.File as any)(csvContent, 'test.csv');

            const result = await planInteractif.importCsv(file);

            expect(result[0]).toEqual({
                PieceName: "Room1Test", // Note: slashes are removed by sanitization
                QRCODE: "QR001",
                coordX: 15,
                coordY: 25
            });
        });

        it('should reject on FileReader error', async () => {
            const file = new (global.File as any)(["invalid"], 'test.csv');
            
            // Mock FileReader to simulate error
            const originalFileReader = global.FileReader;
            global.FileReader = class extends originalFileReader {
                readAsText() {
                    setTimeout(() => {
                        if (this.onerror) {
                            this.onerror({ target: { error: new Error('FileReader error') } } as any);
                        }
                    }, 0);
                }
            } as any;

            await expect(planInteractif.importCsv(file)).rejects.toBeDefined();
            
            global.FileReader = originalFileReader;
        });
    });

    describe('geoJsonVide computed property', () => {
        it('should return empty GeoJSON structure', () => {
            const result = planInteractif.geoJsonVide;

            expect(result).toEqual({
                type: "FeatureCollection",
                features: []
            });
        });

        it('should return new instance each time', () => {
            const result1 = planInteractif.geoJsonVide;
            const result2 = planInteractif.geoJsonVide;

            expect(result1).toEqual(result2);
            expect(result1).not.toBe(result2); // Different instances
        });
    });

    describe('VGSDK integration', () => {
        it('should be accessible through VGSDK', () => {
            expect(sdk.planInteractif).toBeInstanceOf(PlanInteractif);
        });
    });
});
