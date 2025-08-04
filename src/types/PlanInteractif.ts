/**
 * PlanInteractif Types
 * 
 * TypeScript interfaces for interactive floor plan operations, GeoJSON features,
 * coordinate systems, piece/equipment positioning, and CSV import/export functionality.
 * 
 * Migrated from: mixins_to_migrate/PlanInteractifMixins.js
 */

/**
 * Coordinates interface for latitude/longitude pairs
 */
export interface LatLng {
    lat: number;
    lng: number;
}

/**
 * GeoJSON Point geometry
 */
export interface GeoJsonPoint {
    type: "Point";
    coordinates: [number, number]; // [lng, lat] format
}

/**
 * GeoJSON Feature properties for pieces/equipment
 */
export interface FeatureProperties {
    id?: any;
    libel_lieu?: string;
    coordX?: number;
    coordY?: number;
    categorie?: CategoryInfo;
    codeUn?: string;
    service?: string;
    type_lieu?: string;
    idLieuParent_id?: any;
    userId?: string;
    uid?: string;
    [key: string]: any; // Allow additional properties
}

/**
 * Category information for pieces
 */
export interface CategoryInfo {
    libelleCatgorie: string;
    [key: string]: any;
}

/**
 * GeoJSON Feature object
 */
export interface GeoJsonFeature {
    type: "Feature";
    geometry: GeoJsonPoint;
    properties: FeatureProperties;
    id: any;
}

/**
 * GeoJSON FeatureCollection
 */
export interface GeoJsonFeatureCollection {
    type: "FeatureCollection";
    features: GeoJsonFeature[];
}

/**
 * Floor/Stage information
 */
export interface Etage {
    id: any;
    path: string; // Path format: "/site/building/floor"
    [key: string]: any;
}

/**
 * Piece data for creation
 */
export interface PieceACreer {
    libel_lieu: string;
    type_lieu: "Piece";
    idLieuParent_id: any;
    categorie: CategoryInfo;
    codeUn: string;
    userId: string;
    service: string;
}

/**
 * Equipment/Piece collection item
 */
export interface CollectionItem {
    id: any;
    libel_lieu?: string;
    codeUn?: string;
    [key: string]: any;
}

/**
 * Positioning analysis result
 */
export interface PositioningResult {
    positioned: CollectionItem[];
    nonPositioned: CollectionItem[];
}

/**
 * CSV import data structure
 */
export interface CsvImportData {
    coordX: number;
    coordY: number;
    [key: string]: any; // Additional CSV columns
}

/**
 * Excel export row data
 */
export interface ExcelExportRow {
    piece: string;
    qrcode: string;
    categorie: string;
    service: string;
    site: string;
    batiment: string;
    etage: string;
}

/**
 * File export options
 */
export interface ExportOptions {
    fileName?: string;
    includeHeaders?: boolean;
    dateFormat?: string;
}

/**
 * CSV import options
 */
export interface CsvImportOptions {
    delimiter?: string;
    hasHeaders?: boolean;
    sanitizeData?: boolean;
}

/**
 * Plan interaction context
 */
export interface PlanInteractionContext {
    appID: string;
    currentEtage: Etage;
    geoJsonData: GeoJsonFeatureCollection;
    selectedFeatures?: GeoJsonFeature[];
}

/**
 * Coordinate transformation utilities
 */
export interface CoordinateTransform {
    fromLatLng(latlng: LatLng): [number, number];
    toLatLng(coordinates: [number, number]): LatLng;
    isValidCoordinate(coord: any): boolean;
}

/**
 * Feature manipulation operations
 */
export interface FeatureOperations {
    create: (data: FeatureProperties, position: LatLng) => GeoJsonFeature;
    update: (feature: GeoJsonFeature, newPosition: LatLng) => GeoJsonFeature;
    delete: (featureId: any) => boolean;
    move: (featureId: any, newPosition: LatLng) => GeoJsonFeature | null;
}

/**
 * Plan export configuration
 */
export interface PlanExportConfig {
    format: 'excel' | 'csv' | 'json';
    includeGeometry: boolean;
    includeProperties: boolean;
    customHeaders?: string[];
    filterFunction?: (feature: GeoJsonFeature) => boolean;
}

/**
 * Plan import configuration
 */
export interface PlanImportConfig {
    format: 'csv' | 'json';
    coordinateMapping: {
        xField: string;
        yField: string;
    };
    propertyMapping?: { [csvField: string]: string };
    validation?: (data: any) => boolean;
}
