"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiers = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Tiers API request class
 * Service for managing tiers
 */
class Tiers extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/tiers';
        this.endpointSingleton = '/api/tiers';
    }
}
exports.Tiers = Tiers;
//# sourceMappingURL=Tiers.js.map