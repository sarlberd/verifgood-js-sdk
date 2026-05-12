"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Operation_1 = require("../types/Operation");
/**
 * Operation API request class
 * Service for managing operations and interventions
 */
class Operation extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/operations';
        this.endpointSingleton = '/api/operation';
    }
    /**
     * Creates a new Operation object with default values
     * Replaces the Vue.js mixin data functionality
     */
    createNew(idUser, userId) {
        return (0, Operation_1.createDefaultOperation)(idUser, userId);
    }
    /**
     * Create BI Operation
     * @param data Operation data including ficheSav, tiers, uploadedFile, action
     * @param idUser Current user ID
     * @param userId App/User ID
     * @returns Promise with response
     */
    createBIOperation(data, idUser, userId) {
        var _a;
        //@TODO: complex logic - need manual review
        const payload = {
            operation: "Bon Intervention",
            ficheSav: data.ficheSav,
            tiers: data.tiers,
            __uploadedFile: (_a = data.__uploadedFile) === null || _a === void 0 ? void 0 : _a.id,
            __action: data.__action,
            dateOperation: new Date().toISOString().slice(0, 19).replace('T', ' '),
            idUser: idUser,
            userId: userId
        };
        return this.post('/api/V2.0/Operation', payload);
    }
    /**
     * Create Photo Operation
     * @param idFM Fiche maintenance ID
     * @param file Uploaded file object
     * @param idUser Current user ID
     * @param userId App/User ID
     * @returns Promise with response
     */
    createPhotoOperation(idFM, file, idUser, userId) {
        const payload = {
            __action: "photo",
            __uploadedFile: file.id,
            ficheSav: idFM,
            dateOperation: new Date().toISOString().slice(0, 19).replace('T', ' '),
            idUser: idUser,
            userId: userId
        };
        return this.post('/api/V2.0/Operation', payload);
    }
    /**
     * Update Operation using V2.0 endpoint
     * @param data Operation data to update
     * @returns Promise with response
     */
    updateOperation(data) {
        //@TODO: uses different endpoint than standard update - need manual review
        return this.put('/api/V2.0/Put/Operation', data);
    }
    /**
     * Export operations to file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param fileExtension File extension (csv or excel)
     * @param userId App/User ID
     * @param sites Site restriction
     * @returns Promise that resolves when download starts
     */
    async getFile(metadatas, fileExtension = "csv", userId, sites) {
        //@TODO: complex file download logic - need manual review
        const query = {
            userId: userId,
            sites: sites || '',
        };
        metadatas.setDirectives([]);
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        // Note: File download implementation needs to be adapted for the SDK context
        return this.get(`/api/operations/export/${fileType}`, metadatas, query);
    }
}
exports.Operation = Operation;
//# sourceMappingURL=Operation.js.map