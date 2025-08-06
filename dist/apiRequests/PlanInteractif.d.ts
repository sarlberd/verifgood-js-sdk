import { ApiRequest } from '../core/ApiRequest';
/**
 * PlanInteractif API Service
 *
 * Handles interactive floor plan operations including GeoJSON data manipulation,
 * coordinate transformations, piece/equipment positioning, CSV import/export,
 * and feature collection management for interactive building plans.
 *
 * Migrated from: mixins_to_migrate/PlanInteractifMixins.js
 * Original methods: 11 methods + 1 computed property
 */
export declare class PlanInteractif extends ApiRequest {
    get endpoint(): string;
    get endpointSingleton(): string;
    /**
     * Convert piece or equipment data to GeoJSON feature
     * @param {any} data - Object with id, libel_lieu, coordX, coordY properties
     * @returns {any} GeoJSON feature object
     */
    convertDataToFeature(data: any): any;
    /**
     * Update feature coordinates
     * @param {any} feature - GeoJSON feature object
     * @param {any} latlng - Coordinates object with lat and lng properties
     * @returns {any} Updated feature
     */
    updateFeaturePosition(feature: any, latlng: {
        lat: number;
        lng: number;
    }): any;
    /**
     * Get pieces to create from GeoJSON draft
     * @param {any} geoJsonDraft - GeoJSON draft object
     * @param {any} etage - Floor/stage object with id
     * @param {string} appID - Application ID (replaces this.$app.appID)
     * @returns {any[]} Array of pieces to create
     */
    getPiecesACreer(geoJsonDraft: any, etage: any, appID: string): any[];
    /**
     * Reassign pieces to markers in GeoJSON
     * @param {any[]} pieces - Array of piece objects
     * @param {any} geoJson - GeoJSON object
     * @returns {any} Modified GeoJSON with reassigned pieces
     */
    reaffectePiecesAuxMarkers(pieces: any[], geoJson: any): any;
    /**
     * Get positioned and non-positioned elements
     * @param {any[]} collection - Array of pieces or equipment
     * @param {any} geoJson - GeoJSON object
     * @returns {[any[], any[]]} Array with [positioned, nonPositioned] elements
     */
    getElementsPositionneesEtNonPositionnees(collection: any[], geoJson: any): [any[], any[]];
    /**
     * Create new GeoJSON feature
     * @param {any} datas - Equipment or piece data
     * @param {any} latlng - Coordinates object with lat and lng
     * @returns {any} New GeoJSON feature
     */
    newGeoJsonFeature(datas: any, latlng: {
        lat: number;
        lng: number;
    }): any;
    /**
     * Create deep copy of GeoJSON (not shallow copy)
     * @param {any} geoJson - GeoJSON object to copy
     * @returns {any} Deep copy of GeoJSON
     */
    geoJsonDeepCopy(geoJson: any): any;
    /**
     * Export pieces to create as Excel file
     * @param {any} geoJson - GeoJSON object
     * @param {any} etage - Floor object with path property
     * @param {string} fileName - Base filename for export
     */
    exportPiecesACreerExcel(geoJson: any, etage: any, fileName?: string): void;
    /**
     * Export data to Excel file
     * @param {any[]} datas - Data array to export
     * @param {string[] | null} header - Optional header row
     * @param {string} fileName - Base filename
     */
    exportExcel(datas: any[], header: string[] | null | undefined, fileName: string): void;
    /**
     * Import CSV file and convert to array of objects
     * @param {File} inputFile - CSV file to import
     * @returns {Promise<any[]>} Promise resolving to array of objects
     */
    importCsv(inputFile: File): Promise<any[]>;
    /**
     * Get empty GeoJSON structure
     * Mimics the original computed property behavior
     * @returns {any} Empty GeoJSON FeatureCollection
     */
    get geoJsonVide(): any;
}
