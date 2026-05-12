import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";
import { Lieu, LieuCreateRequest, LieuUpdateRequest, FamilleColor } from "../types/Lieux";
export declare class Lieux extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get initiales (abbreviation) from lieu path
     * @param lieu The lieu object
     * @param level The level in the path (default: 1)
     * @returns String with initiales
     */
    getInitiales(lieu: Lieu, level?: number): string;
    /**
     * Get organisations (lieux with type_lieu=Organisation)
     * @param metadatas Metadatas object
     * @returns Promise with organisations
     */
    getOrganisations(metadatas?: any): Promise<any>;
    /**
     * Get sites (lieux with type_lieu=Site)
     * @param metadatas Metadatas object
     * @returns Promise with sites and metas
     */
    getSites(metadatas: Metadatas): Promise<any>;
    /**
     * Get all lieux with options
     * @param metadatas Metadatas object
     * @param options Options for the request
     * @returns Promise with lieux and metas
     */
    getLieux(metadatas: Metadatas, options?: {
        _stored_counters?: boolean;
        _isOrderedBySiteAsc?: boolean;
    }): Promise<any>;
    /**
     * Get single lieu by ID
     * @param idLieu Lieu ID
     * @param options Options for the request
     * @returns Promise with lieu data
     */
    getLieu(idLieu: number, options?: {
        skipVueXStorage?: boolean;
    }): Promise<any>;
    /**
     * Create lieux
     * @param lieux Array of lieux to create
     * @param options Options for the request
     * @returns Promise with created lieux
     */
    create(lieux: LieuCreateRequest[], options?: {
        dernierNumeroPiece?: any;
    }): Promise<any>;
    /**
     * Import pieces from CSV
     * @param lieux CSV string
     * @returns Promise with import result
     */
    importPieces(lieux: string): Promise<any>;
    /**
     * Create generic pieces for a site
     * @param siteId Site ID
     * @param lieux Array of lieux to create
     * @returns Promise with created pieces
     */
    createPiecesGeneriques(siteId: number, lieux: any[]): Promise<any>;
    /**
     * Create generic pieces for sites in a family
     * @param famille Family name
     * @param lieux Array of lieux to create
     * @returns Promise with created pieces
     */
    createPiecesGeneriquesFamilleSite(famille: string, lieux: any[]): Promise<any>;
    /**
     * Create a single generic piece for a site
     * @param siteId Site ID
     * @returns Promise with created piece
     */
    createPieceGenerique(siteId: number): Promise<any>;
    /**
     * Update a single lieu
     * @param lieu Lieu object to update
     * @returns Promise with updated lieu
     */
    updateLieu(lieu: LieuUpdateRequest & {
        id: number;
    }): Promise<any>;
    /**
     * Update multiple lieux
     * @param lieux Array of lieux to update
     * @returns Promise with updated lieux
     */
    updateLieux(lieux: (LieuUpdateRequest & {
        id: number;
    })[]): Promise<any>;
    /**
     * Delete a lieu
     * @param lieu Lieu object to delete
     * @returns Promise with deletion result
     */
    deleteLieu(lieu: Lieu): Promise<any>;
    /**
     * Get excel file export
     * @param metadatas Metadatas object
     * @param filename Filename (optional)
     * @param fileExtension File extension (default: xlsx)
     * @returns Promise with file download
     */
    getExcelFile(metadatas: Metadatas, filename?: string, fileExtension?: string): Promise<any>;
    /**
     * Save restriction site for user (deprecated)
     * @param collection Collection data
     * @returns Promise with result
     */
    saveRestrictionSiteForUser(collection: any): Promise<any>;
    /**
     * Get famille background colors
     * @param familles Array of famille names
     * @returns Array of famille colors
     */
    getFamilleBackgroundColor(familles: string[]): FamilleColor[];
    /**
     * Get familles from sites
     * @param sites Array of sites
     * @returns Array of famille colors
     */
    getFamilles(sites: any[]): FamilleColor[];
}
