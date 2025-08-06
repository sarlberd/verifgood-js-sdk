"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lieux = void 0;
const Metadatas_1 = require("../core/Metadatas");
const ApiRequest_1 = require("../core/ApiRequest");
class Lieux extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/lieux';
        this.endpointSingleton = '/api/lieu';
    }
    /**
     * Get initiales (abbreviation) from lieu path
     * @param lieu The lieu object
     * @param level The level in the path (default: 1)
     * @returns String with initiales
     */
    getInitiales(lieu, level = 1) {
        if (!lieu.path)
            return "";
        let libel = lieu.path.split("/")[level];
        if (!libel)
            return "";
        const regexBeginWithNumber = /(^[0-9]*)\w+\s*?-\s*/;
        let initiales = "";
        if (libel.match(regexBeginWithNumber)) {
            initiales = libel.match(regexBeginWithNumber)[0];
            libel = libel.replace(initiales, "");
        }
        const words = libel.split(" ");
        if (words.length === 1) {
            initiales += words[0].substring(0, 3);
        }
        else {
            words.forEach((word) => initiales += word.slice(0, 1));
        }
        return initiales.toUpperCase() + "-";
    }
    /**
     * Get organisations (lieux with type_lieu=Organisation)
     * @param metadatas Metadatas object
     * @returns Promise with organisations
     */
    async getOrganisations(metadatas = { directives: [], filters: [] }) {
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas
        };
        query.metadatas.filters.push({
            attr: "type_lieu",
            value: "Organisation",
            action: "equals"
        });
        return this.get(this.endpoint, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Get sites (lieux with type_lieu=Site)
     * @param metadatas Metadatas object
     * @returns Promise with sites and metas
     */
    async getSites(metadatas) {
        metadatas.filterExist("type_lieu");
        metadatas.setFilter("type_lieu", "Site");
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get()
        };
        // TODO: Add restriction site logic
        // if (this.$app.restrictionsite) {
        //   query.metadatas.filters.push({
        //     attr: "path",
        //     value: this.$app.restrictionsite.split("|"),
        //     action: "start_with"
        //   });
        // }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Get all lieux with options
     * @param metadatas Metadatas object
     * @param options Options for the request
     * @returns Promise with lieux and metas
     */
    async getLieux(metadatas, options = {}) {
        const { _stored_counters = false, _isOrderedBySiteAsc = false } = options;
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get(),
            sites: null, // this.$app.restrictionsite equivalent
            isOrderedBySiteAsc: _isOrderedBySiteAsc
        };
        // TODO: Add restriction site logic
        // if (this.$app.restrictionsite) {
        //   query.metadatas.filters.push({
        //     attr: "path",
        //     value: this.$app.restrictionsite.split("|"),
        //     action: "start_with"
        //   });
        // }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Get single lieu by ID
     * @param idLieu Lieu ID
     * @param options Options for the request
     * @returns Promise with lieu data
     */
    async getLieu(idLieu, options = {}) {
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.get(`${this.endpointSingleton}/${idLieu}`, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Create lieux
     * @param lieux Array of lieux to create
     * @param options Options for the request
     * @returns Promise with created lieux
     */
    async create(lieux, options = {}) {
        const query = {
            datas: lieux
        };
        if (options.dernierNumeroPiece) {
            query.dernierNumeroPiece = options.dernierNumeroPiece;
        }
        return this.post(`${this.endpoint}?userId=${null}`, query);
    }
    /**
     * Import pieces from CSV
     * @param lieux CSV string
     * @returns Promise with import result
     */
    async importPieces(lieux) {
        // TODO: Need to handle content type change
        const query = { datas: [] };
        return this.post('/api/integration/pieces', `csv=${lieux}`);
    }
    /**
     * Create generic pieces for a site
     * @param siteId Site ID
     * @param lieux Array of lieux to create
     * @returns Promise with created pieces
     */
    async createPiecesGeneriques(siteId, lieux) {
        return this.post(`/api/site/${siteId}/pieces/generiques?userId=${null}`, lieux);
    }
    /**
     * Create generic pieces for sites in a family
     * @param famille Family name
     * @param lieux Array of lieux to create
     * @returns Promise with created pieces
     */
    async createPiecesGeneriquesFamilleSite(famille, lieux) {
        return this.post(`/api/sites/${famille}/pieces/generiques?userId=${null}`, lieux);
    }
    /**
     * Create a single generic piece for a site
     * @param siteId Site ID
     * @returns Promise with created piece
     */
    async createPieceGenerique(siteId) {
        return this.post(`/api/site/${siteId}/piece/generique?userId=${null}`, {});
    }
    /**
     * Update a single lieu
     * @param lieu Lieu object to update
     * @returns Promise with updated lieu
     */
    async updateLieu(lieu) {
        return this.put(`${this.endpointSingleton}/${lieu.id}?userId=${null}`, lieu);
    }
    /**
     * Update multiple lieux
     * @param lieux Array of lieux to update
     * @returns Promise with updated lieux
     */
    async updateLieux(lieux) {
        return this.put(this.endpoint, lieux);
    }
    /**
     * Delete a lieu
     * @param lieu Lieu object to delete
     * @returns Promise with deletion result
     */
    async deleteLieu(lieu) {
        if (!lieu.id) {
            throw new Error('Lieu ID is required for deletion');
        }
        return this.delete(`/api/${null}/lieux/${lieu.id}`);
    }
    /**
     * Get excel file export
     * @param metadatas Metadatas object
     * @param filename Filename (optional)
     * @param fileExtension File extension (default: xlsx)
     * @returns Promise with file download
     */
    async getExcelFile(metadatas, filename, fileExtension = "xlsx") {
        // TODO: This method needs browser-specific implementation for file download
        // For now, we'll just return the endpoint and query
        metadatas.setDirectives([]);
        const query = {
            userId: null, // this.$app.appID equivalent
            sites: null, // this.$app.restrictionsite equivalent
            metadatas: metadatas.get(),
            isUserTypeAsDemandeur: 0
        };
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        const endpoint = `/api/lieux/export/${fileType}/${filename}`;
        // TODO: Implement file download logic
        return Promise.resolve({ endpoint, query });
    }
    /**
     * Save restriction site for user (deprecated)
     * @param collection Collection data
     * @returns Promise with result
     */
    async saveRestrictionSiteForUser(collection) {
        // TODO: This method is deprecated and needs review
        return this.post('/api/V2.0/collection/lieuxuser', collection);
    }
    /**
     * Get famille background colors
     * @param familles Array of famille names
     * @returns Array of famille colors
     */
    getFamilleBackgroundColor(familles) {
        const colors = ["#f59c29ff", "#02a7f0ff", "#63a103ff", "#ED705A", "#48c9b0ff", "#ccaadaff", "#188c4eff", "#a9b2c7ff", "#b7950bff", "#1e74aeff"];
        const famillesColors = [];
        const nColors = colors.length;
        let currentIndexColor = 0;
        familles.forEach((f) => {
            famillesColors.push({ label: f, color: colors[currentIndexColor] });
            if (currentIndexColor === nColors - 1) {
                currentIndexColor = 0;
            }
            else {
                currentIndexColor++;
            }
        });
        return famillesColors;
    }
    /**
     * Get familles from sites
     * @param sites Array of sites
     * @returns Array of famille colors
     */
    getFamilles(sites) {
        const familles = [];
        sites.forEach((site) => {
            if (site.famille && site.famille.length !== 0) {
                familles.push(site.famille);
            }
        });
        const uniqueFamilles = familles.filter((famille, index, self) => self.indexOf(famille) === index);
        return this.getFamilleBackgroundColor(uniqueFamilles);
    }
}
exports.Lieux = Lieux;
//# sourceMappingURL=Lieux.js.map