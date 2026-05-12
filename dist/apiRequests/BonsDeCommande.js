"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonsDeCommande = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * BonsDeCommande API request class
 * Service for managing purchase orders (bons de commande)
 */
class BonsDeCommande extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/bons-de-commande';
        this.endpointSingleton = '/api/bon-de-commande';
    }
    /**
     * Cancel a bon de commande
     * @param bonDeCommande - The bon de commande to cancel
     * @returns Promise<any>
     */
    async cancel(bonDeCommande) {
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/cancel`, { datas: bonDeCommande });
    }
    /**
     * Skip sending a bon de commande
     * @param bonDeCommande - The bon de commande to skip sending
     * @returns Promise<any>
     */
    async skipSending(bonDeCommande) {
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/skip-sending`, { datas: bonDeCommande });
    }
    /**
     * Request validation for a bon de commande
     * @param bonDeCommande - The bon de commande to request validation for
     * @returns Promise<any>
     */
    async demandeValidation(bonDeCommande) {
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/demande-validation`, { datas: bonDeCommande });
    }
    /**
     * Send order via email with PDF
     * @param bonDeCommande - The bon de commande to send
     * @param destinataire - Recipient email
     * @param destinataireCC - CC recipient email
     * @param pdfBlob - PDF file as blob
     * @returns Promise<any>
     */
    async envoiCommande(bonDeCommande, destinataire, destinataireCC, pdfBlob) {
        //@TODO: Handle FileReader and moment dependencies - this will be handled manually by devs
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = () => {
                const pdfBase64 = reader.result;
                const envoiDatas = {
                    bonDeCommande: bonDeCommande,
                    dateEnvoi: new Date().toISOString(),
                    user: {
                        //@TODO: Extract user info from app context - this will be handled manually by devs
                        id: null,
                        email: null,
                        nom: null,
                        prenom: null
                    },
                    destinataire: destinataire,
                    destinataireCC: destinataireCC,
                    pdfBase64: pdfBase64
                };
                this.post(`${this.endpointSingleton}/${bonDeCommande.id}/envoi-commande`, { datas: envoiDatas })
                    .then(resolve)
                    .catch(reject);
            };
        });
    }
    /**
     * Deliver items for a bon de commande
     * @param bonDeCommande - The bon de commande
     * @param itemsLivraison - Items to deliver
     * @param depot - Depot information (optional)
     * @returns Promise<any>
     */
    async livraison(bonDeCommande, itemsLivraison, depot = null) {
        const datas = {
            depot_id: depot ? depot.id : null,
            idUser: null, //@TODO: Extract user ID from app context - this will be handled manually by devs
            dateLivraison: new Date().toISOString(),
            datas: itemsLivraison
        };
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/livraison`, datas);
    }
    /**
     * Complete delivery for a bon de commande
     * @param bonDeCommande - The bon de commande
     * @param depot - Depot information (optional)
     * @returns Promise<any>
     */
    async livraisonTotale(bonDeCommande, depot = null) {
        const datas = {
            depot_id: depot ? depot.id : null,
            dateLivraison: new Date().toISOString(),
            idUser: null, //@TODO: Extract user ID from app context - this will be handled manually by devs
            bonDeCommande: bonDeCommande
        };
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/livraison-totale`, datas);
    }
    /**
     * Mark bon de commande as not delivered
     * @param bonDeCommande - The bon de commande to mark as not delivered
     * @returns Promise<any>
     */
    async nonLivre(bonDeCommande) {
        return this.put(`${this.endpointSingleton}/${bonDeCommande.id}/non-livre`, { datas: bonDeCommande });
    }
    /**
     * Clone a bon de commande
     * @param bonDeCommande - The bon de commande to clone
     * @returns BonsDeCommand - Cloned bon de commande
     */
    clone(bonDeCommande) {
        return {
            ...bonDeCommande,
            id: undefined,
            numero: undefined,
            statut: "draft",
            statutLivraison: undefined,
            statutPaiement: undefined,
            dateCreation: new Date().toISOString()
        };
    }
    /**
     * Get historical data for a bon de commande
     * @param bonDeCommande_id - ID of the bon de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    async getHistorique(bonDeCommande_id, metadatas) {
        return this.get(`${this.endpointSingleton}/${bonDeCommande_id}/historique`, metadatas, null);
    }
    /**
     * Get PDF export of bon de commande
     * @param idBonDeCommande - ID of the bon de commande
     * @param options - Export options
     * @returns Promise<{fileURL: string, blob: Blob}>
     */
    async getPDF(idBonDeCommande, options = {}) {
        //@TODO: Handle blob response type configuration - this will be handled manually by devs
        const response = await this.post(`${this.endpointSingleton}/${idBonDeCommande}/export/pdf/S`, options);
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        return { fileURL, blob: file };
    }
    /**
     * Get amount distribution for dashboard
     * @param metadatas - Metadata for the request
     * @param options - Additional options
     * @returns Promise<any>
     */
    async getRepartitionMontantHt(metadatas, options = { _stored: true }) {
        //@TODO: Extract app ID and site restrictions from context - this will be handled manually by devs
        const query = {
            userId: null,
            sites: null
        };
        return this.get('/api/dashboard/bons-de-commande/repartition-montant-ht', metadatas, query);
    }
    /**
     * Export bons de commande to file
     * @param metadatas - Metadata for export
     * @param filename - Output filename (optional)
     * @param fileExtension - File extension (xlsx or csv)
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    async export(metadatas, filename = null, fileExtension = "xlsx") {
        metadatas.setDirectives([]);
        const query = {
            sites: null //@TODO: Extract site restrictions from context - this will be handled manually by devs
        };
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
        const response = await this.get(`${this.endpoint}/export/${fileType}`, metadatas, query);
        metadatas.setLimit(0, 25);
        // Create blob with proper encoding
        let blob;
        if (fileExtension === "csv") {
            // Add BOM for UTF-8 encoding
            const BOM = "\uFEFF";
            blob = new Blob([BOM + response], { type: contentType });
        }
        else {
            blob = new Blob([response], { type: contentType });
        }
        return blob;
    }
    /**
     * Get creators of bons de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    async getCreateurs(metadatas) {
        //@TODO: Extract app ID from context - this will be handled manually by devs
        const query = {
            userId: null
        };
        return this.get(`${this.endpoint}/createurs`, metadatas, query);
    }
    /**
     * Get validators of bons de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    async getValidateurs(metadatas) {
        //@TODO: Extract app ID from context - this will be handled manually by devs
        const query = {
            userId: null
        };
        return this.get(`${this.endpoint}/validateurs`, metadatas, query);
    }
}
exports.BonsDeCommande = BonsDeCommande;
//# sourceMappingURL=BonsDeCommande.js.map