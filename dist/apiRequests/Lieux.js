"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lieux = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Lieux extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/lieux';
        this.endpointSingleton = '/api/lieu';
    }
    getSites(metadatas, restrictionSite) {
        return __awaiter(this, void 0, void 0, function* () {
            // à gérer plus haut if (restrictionSite) metadatas.setFilter("path", restrictionSite.split("|"), "start_with");
            return this.get(this.endpoint, metadatas, null);
        });
    }
}
exports.Lieux = Lieux;
