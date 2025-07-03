"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkpoints = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Checkpoints extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/checkpoints';
        this.endpointSingleton = '/api/checkpoints';
    }
}
exports.Checkpoints = Checkpoints;
//# sourceMappingURL=Checkpoints.js.map