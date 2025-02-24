"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedLinks = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const origins = ["maintenance-curative"];
class SharedLinks extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/shared-links';
        this.endpointSingleton = '/api/shared-links';
    }
}
exports.SharedLinks = SharedLinks;
