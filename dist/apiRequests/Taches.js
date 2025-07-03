"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taches = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Checkpoints_1 = require("./Checkpoints");
class Taches extends ApiRequest_1.ApiRequest {
    constructor(auth, apiBaseUrl) {
        super(auth, apiBaseUrl);
        this.endpoint = '/api/taches';
        this.endpointSingleton = '/api/tache';
        this.checkpointsApi = new Checkpoints_1.Checkpoints(auth, apiBaseUrl);
    }
}
exports.Taches = Taches;
//# sourceMappingURL=Taches.js.map