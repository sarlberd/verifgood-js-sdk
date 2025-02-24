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
exports.Equipements = void 0;
const Metadatas_1 = require("../core/Metadatas");
const ApiRequest_1 = require("../core/ApiRequest");
class Equipements extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/equipements';
        this.endpointSingleton = '/api/equipement';
        this.appID = '';
        this.restrictionsite = '';
    }
    getEquipementVerifications(equipement_id_1) {
        return __awaiter(this, arguments, void 0, function* (equipement_id, metadatas = new Metadatas_1.Metadatas('{"directives":[],"filters":[]}')) {
            const query = {
                userId: this.appID,
                metadatas: metadatas.get()
            };
            const response = yield this.apiRequest(`${this.endpointSingleton}/${equipement_id}/verifications`, 'GET', query);
            return { datas: response };
        });
    }
    /**
     *
     * @example
       vgsdk.equipements.getById(1).then().catch();
     */
    getById(idEquipement) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = null;
            const response = yield this.apiRequest(`${this.endpointSingleton}/${idEquipement}`, 'GET', query);
            response[0] = this.calculDepreciation(response[0]);
            return response[0];
        });
    }
    getRapportAssets(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId: this.appID,
                metadatas: metadatas.get(),
                sites: this.restrictionsite
            };
            const response = yield this.apiRequest(`${this.endpoint}/valeurs-financieres`, 'GET', query);
            return response.equipements;
        });
    }
    getRapportAssetsExcelFile(metadatas_1) {
        return __awaiter(this, arguments, void 0, function* (metadatas, fileExtension = "xlsx") {
            metadatas.setDirectives([]);
            const query = {
                metadatas: metadatas.get()
            };
            const fileType = fileExtension !== "csv" ? "excel" : "csv";
            const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
            const responseType = fileExtension !== "csv" ? "blob" : "text";
            const response = yield this.apiRequest(`${this.endpoint}/valeurs-financieres/export/${fileType}`, 'GET', query);
            const blob = fileExtension === "csv" ? new Blob(["\uFEFF" + response], { type: contentType }) : new Blob([response], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `rapport_assets_${this.formatDate(new Date())}.${fileExtension}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    getAll(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                sites: this.restrictionsite
            };
            const response = yield this.get(this.endpoint, metadatas, query);
            response.datas.forEach((equipement, i) => {
                response.datas[i] = this.calculDepreciation(equipement);
            });
            return response;
        });
    }
    getEquipementsTachesActivesSites(site, metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId: this.appID,
                site: site,
                metadatas: metadatas.get()
            };
            const response = yield this.apiRequest(`${this.endpoint}/taches/active/site`, 'GET', query);
            return { datas: response.equipements, metadatas: response.meta };
        });
    }
    getExcelFileModeleIntegration() {
        return __awaiter(this, arguments, void 0, function* (filename = "VG_modèle_importation_equipements") {
            const query = {
                userId: this.appID,
                sites: this.restrictionsite || ''
            };
            const response = yield this.apiRequest(`${this.endpoint}/integration/model`, 'GET', query);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}_${this.formatDate(new Date())}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    getExcelFile(metadatas_1) {
        return __awaiter(this, arguments, void 0, function* (metadatas, filename = null, fileExtension = "xlsx") {
            metadatas.setDirectives([]);
            const query = {
                userId: this.appID,
                sites: this.restrictionsite || '',
                metadatas: metadatas.get(),
                isUserTypeAsDemandeur: 0
            };
            const fileType = fileExtension !== "csv" ? "excel" : "csv";
            const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
            const responseType = fileExtension !== "csv" ? "blob" : "text";
            const response = yield this.apiRequest(`${this.endpoint}/export/${fileType}`, 'GET', query);
            const blob = fileExtension === "csv" ? new Blob(["\uFEFF" + response], { type: contentType }) : new Blob([response], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}_${this.formatDate(new Date())}.${fileExtension}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    create(equipements) {
        return __awaiter(this, void 0, void 0, function* () {
            equipements.forEach((equipement) => {
                if (!equipement.marker && equipement.marker == null)
                    delete equipement.marker;
                if (navigator.geolocation) {
                    try {
                        navigator.geolocation.getCurrentPosition((position) => {
                            equipement.posY = position.coords.latitude;
                            equipement.posX = position.coords.longitude;
                        });
                    }
                    catch (err) {
                        console.warn("Cannot get position xy");
                    }
                }
            });
            const response = yield this.apiRequest(this.endpointSingleton, 'POST', equipements);
            return response;
        });
    }
    importModelEquipementsExcel(equipements) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiRequest(`${this.endpoint}/integration/model`, 'POST', equipements);
            return response;
        });
    }
    sortirEquipement(equipement, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiRequest(`${this.endpointSingleton}/sortie`, 'POST', equipement);
            callback && callback();
        });
    }
    remplacerEquipement(sortie, maintenance) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiRequest(`/maintenance/${maintenance.id}/equipement/remplacement`, 'POST', sortie);
            return response;
        });
    }
    update(equipement_1) {
        return __awaiter(this, arguments, void 0, function* (equipement, _options = { skipVueXStorage: false }) {
            const response = yield this.apiRequest(`${this.endpointSingleton}/${equipement.id}?userId=${this.appID}`, 'PUT', equipement);
            return response;
        });
    }
    updateEquipements(equipements) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiRequest(this.endpoint, 'PUT', equipements);
            response.forEach((equipement) => {
            });
            return response;
        });
    }
    remove(equipementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.delete(`${this.endpointSingleton}/${equipementId}`);
            return response;
        });
    }
    createEquipementsGlobauxFamilleSite(famille, equipements) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiRequest(`/sites/${famille}/equipements/globaux?userId=${this.appID}`, 'POST', equipements);
            return response;
        });
    }
    calculDepreciation(equipement) {
        equipement.depreciationAnnuelle = 0;
        equipement.depreciationMensuelle = 0;
        equipement.depreciationCumulee = 0;
        equipement.depreciationRestante = 0;
        equipement.dateFin = null;
        equipement.moisUtilisation = "-";
        if (!equipement.miseEnService) {
            return equipement;
        }
        const tauxDepreciationAnnuel = Number(equipement.tauxDepreciationAnnuel);
        const tauxDepreciationEnPourcent = Number.isNaN(tauxDepreciationAnnuel) ? 0 : tauxDepreciationAnnuel;
        let valeurAchat = Number(equipement.valeurAchat);
        valeurAchat = Number.isNaN(valeurAchat) || valeurAchat === 0 ? 0 : valeurAchat;
        equipement.valeurAchat = valeurAchat;
        const dateDebut = equipement.miseEnService ? new Date(equipement.miseEnService) : new Date(equipement.created_at);
        if (!equipement.miseEnService || equipement.miseEnService.length === 0)
            equipement.miseEnService = equipement.created_at;
        equipement.depreciationRestante = valeurAchat;
        equipement.dateFin = new Date(dateDebut);
        equipement.dateFin.setFullYear(equipement.dateFin.getFullYear() + (100 / tauxDepreciationEnPourcent));
        equipement.moisUtilisation = this.diffMonths(new Date(), dateDebut);
        equipement.depreciationAnnuelle = Number(tauxDepreciationEnPourcent) / 100 * valeurAchat;
        equipement.depreciationMensuelle = (Number(tauxDepreciationEnPourcent) / 100 * valeurAchat) / 12;
        if (equipement.moisUtilisation !== 0) {
            const decote = equipement.depreciationMensuelle * equipement.moisUtilisation;
            equipement.depreciationCumulee = decote;
            if (decote > valeurAchat) {
                equipement.depreciationCumulee = valeurAchat;
            }
            if (decote < valeurAchat) {
                const depreciationRestante = equipement.depreciationMensuelle * (this.diffMonths(equipement.dateFin, dateDebut) - equipement.moisUtilisation);
                equipement.depreciationRestante = depreciationRestante;
            }
        }
        return equipement;
    }
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    diffMonths(date1, date2) {
        const years = date1.getFullYear() - date2.getFullYear();
        const months = date1.getMonth() - date2.getMonth();
        return years * 12 + months;
    }
}
exports.Equipements = Equipements;
//export default Equipements;
