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
exports.Categories = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
class Categories extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/categories';
        this.endpointSingleton = '/api/categorie';
    }
    associateComposant(categorie_id, composant) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(`${this.endpoint}/${categorie_id}/composants`, { datas: [composant] });
        });
    }
    desassociateComposant(composant_categorie_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/composant-categorie/${composant_categorie_id}`);
        });
    }
}
exports.Categories = Categories;
