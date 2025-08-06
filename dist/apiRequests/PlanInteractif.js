"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanInteractif = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
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
class PlanInteractif extends ApiRequest_1.ApiRequest {
    get endpoint() {
        return '/api/plan-interactif';
    }
    get endpointSingleton() {
        return '/api/plan-interactif';
    }
    /**
     * Convert piece or equipment data to GeoJSON feature
     * @param {any} data - Object with id, libel_lieu, coordX, coordY properties
     * @returns {any} GeoJSON feature object
     */
    convertDataToFeature(data) {
        // TODO: Preserve original Vue2 logic for data to feature conversion
        // Original: return { "type": "Feature", "geometry": { "type": "Point", "coordinates": [data.coordX, data.coordY] }, "properties": data, "id": null };
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [data.coordX, data.coordY] // coordY = latlng.lng && coordX = latlng.lat
            },
            "properties": data,
            "id": null
        };
    }
    /**
     * Update feature coordinates
     * @param {any} feature - GeoJSON feature object
     * @param {any} latlng - Coordinates object with lat and lng properties
     * @returns {any} Updated feature
     */
    updateFeaturePosition(feature, latlng) {
        // TODO: Preserve original Vue2 logic for feature position updates
        // Original: return { "type": "Feature", "geometry":{ "type": "Point", "coordinates": [latlng.lng, latlng.lat] }, "properties": Object.assign({}, feature.properties, {coordX: latlng.lat, coordY: latlng.lng}), "id": feature.id };
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [latlng.lng, latlng.lat]
            },
            "properties": Object.assign({}, feature.properties, { coordX: latlng.lat, coordY: latlng.lng }),
            "id": feature.id
        };
    }
    /**
     * Get pieces to create from GeoJSON draft
     * @param {any} geoJsonDraft - GeoJSON draft object
     * @param {any} etage - Floor/stage object with id
     * @param {string} appID - Application ID (replaces this.$app.appID)
     * @returns {any[]} Array of pieces to create
     */
    getPiecesACreer(geoJsonDraft, etage, appID) {
        // TODO: Preserve original Vue2 logic for extracting pieces to create
        // Original complex logic with filtering and mapping - preserve exactly
        const markersSansIdentifiants = geoJsonDraft.features.filter((feature) => feature.properties && (!feature.properties.hasOwnProperty("id") || !feature.properties.id));
        const piecesACreer = markersSansIdentifiants.map((marker) => {
            return {
                libel_lieu: marker.properties.libel_lieu,
                type_lieu: "Piece",
                idLieuParent_id: etage.id,
                categorie: marker.properties.categorie,
                codeUn: marker.properties.codeUn,
                userId: appID, // TODO: Was this.$app.appID in original
                service: marker.properties.service
            };
        });
        return piecesACreer;
    }
    /**
     * Reassign pieces to markers in GeoJSON
     * @param {any[]} pieces - Array of piece objects
     * @param {any} geoJson - GeoJSON object
     * @returns {any} Modified GeoJSON with reassigned pieces
     */
    reaffectePiecesAuxMarkers(pieces, geoJson) {
        // TODO: Preserve original Vue2 logic for piece reassignment
        // Original: complex mapping logic with Object.assign and find operations
        const geoJsonModified = Object.assign({}, {}, geoJson);
        let currentPiece = null;
        geoJsonModified.features.forEach((marker, index) => {
            currentPiece = pieces.find((piece) => piece.libel_lieu == marker.properties.libel_lieu && piece.codeUn == marker.properties.codeUn);
            if (currentPiece) {
                geoJsonModified.features[index].properties = currentPiece;
            }
        });
        return geoJsonModified;
    }
    /**
     * Get positioned and non-positioned elements
     * @param {any[]} collection - Array of pieces or equipment
     * @param {any} geoJson - GeoJSON object
     * @returns {[any[], any[]]} Array with [positioned, nonPositioned] elements
     */
    getElementsPositionneesEtNonPositionnees(collection, geoJson) {
        // TODO: Preserve original Vue2 logic for element positioning analysis
        // Original: console.log and array filtering logic
        console.log("PlanInteractif_getElementsPositionneesEtNonPositionnees", collection, geoJson);
        const positionnes = [];
        const nonPositionnes = [];
        const idsGeoJson = geoJson.features.map((marker) => marker.properties.id);
        collection.forEach((item) => {
            if (idsGeoJson.indexOf(item.id) !== -1) {
                positionnes.push(item);
            }
            else {
                nonPositionnes.push(item);
            }
        });
        return [positionnes, nonPositionnes];
    }
    /**
     * Create new GeoJSON feature
     * @param {any} datas - Equipment or piece data
     * @param {any} latlng - Coordinates object with lat and lng
     * @returns {any} New GeoJSON feature
     */
    newGeoJsonFeature(datas, latlng) {
        // TODO: Preserve original Vue2 logic for new feature creation
        // Original: return { "type": "Feature", "geometry":{ "type": "Point", "coordinates": [latlng.lng, latlng.lat] }, "properties": Object.assign({}, datas, {coordX: latlng.lat, coordY: latlng.lng}), "id": datas.uid };
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [latlng.lng, latlng.lat]
            },
            "properties": Object.assign({}, datas, { coordX: latlng.lat, coordY: latlng.lng }),
            "id": datas.uid
        };
    }
    /**
     * Create deep copy of GeoJSON (not shallow copy)
     * @param {any} geoJson - GeoJSON object to copy
     * @returns {any} Deep copy of GeoJSON
     */
    geoJsonDeepCopy(geoJson) {
        // TODO: Preserve original Vue2 logic for deep copying
        // Original: let copyOfGeoJson = { type: "FeatureCollection", features: [] }; copyOfGeoJson.features = [...geoJson.features]; return copyOfGeoJson;
        const copyOfGeoJson = { type: "FeatureCollection", features: [] };
        copyOfGeoJson.features = [...geoJson.features];
        return copyOfGeoJson;
    }
    /**
     * Export pieces to create as Excel file
     * @param {any} geoJson - GeoJSON object
     * @param {any} etage - Floor object with path property
     * @param {string} fileName - Base filename for export
     */
    exportPiecesACreerExcel(geoJson, etage, fileName = "Verifgood_pieces_a_creer_") {
        // TODO: Preserve original Vue2 logic for Excel export
        // Original complex logic with path splitting and array manipulation
        const markers = geoJson.features;
        const piecesACreer = [];
        const path = etage.path.split("/");
        markers.forEach((marker) => {
            if (!marker.properties.hasOwnProperty("id")) {
                piecesACreer.push([
                    marker.properties.libel_lieu,
                    marker.properties.codeUn,
                    marker.properties.categorie.libelleCatgorie,
                    marker.properties.service,
                    path[1],
                    path[2],
                    path[3]
                ]);
            }
        });
        this.exportExcel(piecesACreer, ["Pièce", "QRCODE", "Catégorie", "Service", "Site", "Batiment", "Etage"], fileName);
    }
    /**
     * Export data to Excel file
     * @param {any[]} datas - Data array to export
     * @param {string[] | null} header - Optional header row
     * @param {string} fileName - Base filename
     */
    exportExcel(datas, header = null, fileName) {
        // TODO: Preserve original Vue2 logic for Excel export with browser download
        // Original: complex logic with Blob creation and DOM manipulation
        let datasFile = [...datas];
        if (header)
            datasFile.unshift(header);
        const csvContent = datasFile.map((d) => d.join(",")).join("\n");
        // Browser-specific code - requires window and document
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            try {
                const url = window.URL.createObjectURL(new Blob([csvContent]));
                const link = document.createElement('a');
                link.href = url;
                // Note: Original used moment() - need to implement date formatting
                const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
                link.setAttribute('download', `${fileName}${dateStr}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            catch (error) {
                console.error('Error exporting Excel file:', error);
            }
        }
        else {
            console.warn('Excel export requires browser environment');
        }
    }
    /**
     * Import CSV file and convert to array of objects
     * @param {File} inputFile - CSV file to import
     * @returns {Promise<any[]>} Promise resolving to array of objects
     */
    importCsv(inputFile) {
        // TODO: Preserve original Vue2 logic for CSV import with FileReader
        // Original: complex Promise-based FileReader logic with data sanitization
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const lines = e.target.result.split("\n");
                    let headers = lines[0].split(",");
                    // Remove spaces, slashes, quotes, special characters from headers
                    headers = headers.map((header) => header.replace(/[\s\/"']/g, ""));
                    const datas = [];
                    for (let i = 1; i < lines.length; i++) {
                        let line = lines[i].split(",");
                        // Sanitize each cell: no spaces, no slashes, no quotes, no special characters
                        line = line.map((cell) => cell.replace(/[\s\/"']/g, ""));
                        const data = {};
                        for (let j = 0; j < headers.length; j++) {
                            data[headers[j]] = line[j];
                        }
                        datas.push(data);
                    }
                    // Cast coordX and coordY to int
                    const processedDatas = datas.map((data) => {
                        data.coordX = parseInt(data.coordX);
                        data.coordY = parseInt(data.coordY);
                        return data;
                    });
                    resolve(processedDatas);
                }
                catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (e) => {
                reject(e);
            };
            reader.readAsText(inputFile);
        });
    }
    /**
     * Get empty GeoJSON structure
     * Mimics the original computed property behavior
     * @returns {any} Empty GeoJSON FeatureCollection
     */
    get geoJsonVide() {
        // TODO: Preserve original Vue2 computed property logic
        // Original: return { type: "FeatureCollection", features: [] };
        return {
            type: "FeatureCollection",
            features: []
        };
    }
}
exports.PlanInteractif = PlanInteractif;
//# sourceMappingURL=PlanInteractif.js.map