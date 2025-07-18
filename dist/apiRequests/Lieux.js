"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lieux = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Lieux extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/lieux';
        this.endpointSingleton = '/api/lieu';
    }
    async getSites(metadatas, restrictionSite) {
        // à gérer plus haut if (restrictionSite) metadatas.setFilter("path", restrictionSite.split("|"), "start_with");
        return this.get(this.endpoint, metadatas, null);
    }
}
exports.Lieux = Lieux;
//# sourceMappingURL=Lieux.js.map