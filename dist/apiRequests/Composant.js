"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composant = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Composant API request class
 * Service for managing composants and their associations
 */
class Composant extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/composants';
        this.endpointSingleton = '/api/composant';
    }
    /**
     * Alternative method to create composants (duplicate of create)
     * @param composants Array of composants to create
     * @returns Promise
     */
    async postComposants(composants) {
        return this.post(this.endpoint, { datas: composants });
    }
    /**
     * Alternative method to update a composant (duplicate of update)
     * @param composant Composant to update (must include id)
     * @returns Promise
     */
    async putComposant(composant) {
        // Remove these properties as done in original mixin
        const cleanComposant = { ...composant };
        delete cleanComposant["composants_categorie_id"];
        delete cleanComposant["categorie_id"];
        return this.put(`${this.endpointSingleton}/${composant.id}`, { datas: [cleanComposant] });
    }
    /**
     * Alternative method to delete a composant (legacy endpoint)
     * @param idComposant ID of composant to delete
     * @returns Promise
     */
    async deleteComposant(idComposant) {
        //@TODO: This method uses a legacy endpoint structure that needs review
        return this.apiRequest(`/api/composant/${idComposant}`, 'DELETE', null);
    }
    /**
     * Add a libel problem to a composant
     * @param idComposant Composant ID
     * @param libelProblem Libel problem object
     * @returns Promise
     */
    async postLibelProblem(idComposant, libelProblem) {
        //@TODO: This method needs review - unclear endpoint structure
        return this.post(`/api/libelProblem/composant/${idComposant}`, { datas: [libelProblem] });
    }
    /**
     * Delete a libel problem
     * @param idLibelProblem ID of libel problem to delete
     * @returns Promise
     */
    async deleteLibelProblem(idLibelProblem) {
        //@TODO: This method needs review - unclear endpoint structure
        return this.delete(`/api/libelProblem/${idLibelProblem}`);
    }
    /**
     * Get available icons for composants
     * @returns Promise with array of icon objects
     */
    async getIcons() {
        //@TODO: This method contains custom file loading logic that should be handled manually by devs
        return new Promise((resolve, reject) => {
            const icons = [];
            const folder = "/static/assets/icone/composant/";
            const constFile = "const.json";
            const rawFile = new XMLHttpRequest();
            rawFile.open("GET", folder + constFile, true);
            rawFile.onreadystatechange = () => {
                if (rawFile.readyState === 4) {
                    const response = rawFile.responseText.split(",");
                    response.forEach((iconname) => {
                        iconname = iconname.replace("\r\n", "");
                        if (iconname.includes('.png')) {
                            icons.push({
                                label: iconname.replace('.png', ''),
                                src: folder + iconname
                            });
                        }
                        else if (iconname.includes(".svg")) {
                            icons.push({
                                label: iconname.replace('.svg', ''),
                                src: folder + iconname
                            });
                        }
                    });
                    resolve(icons);
                }
            };
            rawFile.send();
        });
    }
    /**
     * @deprecated - Legacy method for associating composants
     * Associate composants with equipment
     * @param composantsList List of composants to associate
     * @returns Promise
     */
    async associateComposants(composantsList) {
        //@TODO: This method contains legacy logic that should be handled manually by devs
        return this.post("/api/assigncomposants", composantsList);
    }
    /**
     * @deprecated - Legacy method for associating libelle problemes
     * Associate libelle problemes with a composant
     * @param idComposant Composant ID
     * @param lpsList List of libelle problemes
     * @returns Promise
     */
    async associateLibelleProblemes(idComposant, lpsList) {
        //@TODO: This method contains legacy logic that should be handled manually by devs
        const query = lpsList.map((libelle) => ({
            composant: idComposant,
            libelle: libelle
        }));
        return this.post("/api/assignlibellesproblemes", query);
    }
    /**
     * Utility method to get libelle problems for a composant
     * @param composantName Name of the composant
     * @param libelleProblemCollection Collection to search in
     * @returns Filtered array of libelle problems
     */
    getLibelleProblemOf(composantName, libelleProblemCollection) {
        //@TODO: This utility method needs to be called with the appropriate data collection
        return libelleProblemCollection.filter(current => current.libel_composant && current.libel_composant.includes(composantName));
    }
    /**
     * Alternative method to get composants (similar to getAll)
     * @param metadatas Optional metadatas for filtering
     * @returns Promise
     */
    async getComposants(metadatas) {
        const requestMetadatas = metadatas || {
            "directives": [],
            "filters": []
        };
        return this.get(this.endpoint, requestMetadatas, {});
    }
}
exports.Composant = Composant;
//# sourceMappingURL=Composant.js.map