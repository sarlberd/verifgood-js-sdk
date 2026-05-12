import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { BonsDeCommand } from "../types/BonsDeCommande";
/**
 * BonsDeCommande API request class
 * Service for managing purchase orders (bons de commande)
 */
export declare class BonsDeCommande extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Cancel a bon de commande
     * @param bonDeCommande - The bon de commande to cancel
     * @returns Promise<any>
     */
    cancel(bonDeCommande: BonsDeCommand): Promise<any>;
    /**
     * Skip sending a bon de commande
     * @param bonDeCommande - The bon de commande to skip sending
     * @returns Promise<any>
     */
    skipSending(bonDeCommande: BonsDeCommand): Promise<any>;
    /**
     * Request validation for a bon de commande
     * @param bonDeCommande - The bon de commande to request validation for
     * @returns Promise<any>
     */
    demandeValidation(bonDeCommande: BonsDeCommand): Promise<any>;
    /**
     * Send order via email with PDF
     * @param bonDeCommande - The bon de commande to send
     * @param destinataire - Recipient email
     * @param destinataireCC - CC recipient email
     * @param pdfBlob - PDF file as blob
     * @returns Promise<any>
     */
    envoiCommande(bonDeCommande: BonsDeCommand, destinataire: string, destinataireCC: string, pdfBlob: Blob): Promise<any>;
    /**
     * Deliver items for a bon de commande
     * @param bonDeCommande - The bon de commande
     * @param itemsLivraison - Items to deliver
     * @param depot - Depot information (optional)
     * @returns Promise<any>
     */
    livraison(bonDeCommande: BonsDeCommand, itemsLivraison: any[], depot?: any): Promise<any>;
    /**
     * Complete delivery for a bon de commande
     * @param bonDeCommande - The bon de commande
     * @param depot - Depot information (optional)
     * @returns Promise<any>
     */
    livraisonTotale(bonDeCommande: BonsDeCommand, depot?: any): Promise<any>;
    /**
     * Mark bon de commande as not delivered
     * @param bonDeCommande - The bon de commande to mark as not delivered
     * @returns Promise<any>
     */
    nonLivre(bonDeCommande: BonsDeCommand): Promise<any>;
    /**
     * Clone a bon de commande
     * @param bonDeCommande - The bon de commande to clone
     * @returns BonsDeCommand - Cloned bon de commande
     */
    clone(bonDeCommande: BonsDeCommand): BonsDeCommand;
    /**
     * Get historical data for a bon de commande
     * @param bonDeCommande_id - ID of the bon de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    getHistorique(bonDeCommande_id: string, metadatas: Metadatas): Promise<any>;
    /**
     * Get PDF export of bon de commande
     * @param idBonDeCommande - ID of the bon de commande
     * @param options - Export options
     * @returns Promise<{fileURL: string, blob: Blob}>
     */
    getPDF(idBonDeCommande: string, options?: any): Promise<{
        fileURL: string;
        blob: Blob;
    }>;
    /**
     * Get amount distribution for dashboard
     * @param metadatas - Metadata for the request
     * @param options - Additional options
     * @returns Promise<any>
     */
    getRepartitionMontantHt(metadatas: Metadatas, options?: any): Promise<any>;
    /**
     * Export bons de commande to file
     * @param metadatas - Metadata for export
     * @param filename - Output filename (optional)
     * @param fileExtension - File extension (xlsx or csv)
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    export(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<Blob>;
    /**
     * Get creators of bons de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    getCreateurs(metadatas: Metadatas): Promise<any>;
    /**
     * Get validators of bons de commande
     * @param metadatas - Metadata for the request
     * @returns Promise<any>
     */
    getValidateurs(metadatas: Metadatas): Promise<any>;
}
