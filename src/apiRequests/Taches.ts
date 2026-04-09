import {ApiRequest} from "../core/ApiRequest";
import {Metadatas} from "../core/Metadatas";
import { TacheCreateRequest, TacheUpdateRequest, GetTachesOptions } from "../types/Taches";


export class Taches extends ApiRequest {
    endpoint: string = '/api/taches';
    endpointSingleton: string = '/api/tache';

    /**
     * Get all taches with optional site restrictions.
     * GET /taches
     * @param metadatas Metadatas object for query options
     * @param options Options for query modification
     * @returns Promise with list of taches
     */
    public getTaches(metadatas: Metadatas, options: GetTachesOptions = {}): Promise<any> {
        const query: any = {};

        if (options.restrictionSites) {
            query.sites = options.restrictionSites;
        }

        return this.get(this.endpoint, metadatas, query);
    }

    /**
     * Get taches overview statistics.
     * GET /taches/overview
     * @param metadatas Metadatas object for filters
     * @param options Options for query modification
     * @returns Promise with overview statistics
     */
    public getTachesOverview(metadatas: Metadatas, options: GetTachesOptions = {}): Promise<any> {
        const query: any = {};

        if (options.restrictionSites) {
            query.sites = options.restrictionSites;
        }

        return this.get(`${this.endpoint}/overview`, metadatas, query);
    }

    /**
     * Get a single tache by ID with checkpoints, affectations, sites and linked equipements.
     * GET /tache/{id}
     * @param id The tache ID
     * @returns Promise with tache details
     */
    public getTache(id: number): Promise<any> {
        return this.get(`${this.endpointSingleton}/${id}`, new Metadatas(), {});
    }

    /**
     * Create multiple taches with checkpoints.
     * POST /taches
     * @param taches Array of tache objects to create
     * @param restrictionSites Optional site restrictions
     * @returns Promise with created taches
     */
    public createTaches(taches: TacheCreateRequest[], restrictionSites: string | null = null): Promise<any> {
        const data: any = { datas: taches };

        if (restrictionSites) {
            data.restrictionSites = restrictionSites;
        }

        return this.post(this.endpoint, data);
    }

    /**
     * Update a tache with its related entities.
     * PUT /tache/{id}
     * @param tache The tache object to update
     * @param updatedTacheSites Optional updated tache sites
     * @returns Promise with updated tache
     */
    public updateTache(tache: TacheUpdateRequest, updatedTacheSites: any = null): Promise<any> {
        const datasTache = { ...tache };

        if (updatedTacheSites) {
            datasTache.tacheSites = updatedTacheSites;
        }

        return this.put(`${this.endpointSingleton}/${tache.id}`, { datas: datasTache });
    }

    /**
     * Delete a tache and all its associations.
     * DELETE /tache/{id}
     * @param tache The tache object to delete
     * @returns Promise with deletion confirmation
     */
    public deleteTache(tache: { id: number }): Promise<any> {
        return this.delete(`${this.endpointSingleton}/${tache.id}`);
    }

    /**
     * Export taches to Excel/CSV file.
     * GET /taches/export/{format}
     * @param metadatas Metadatas for the export
     * @param filename Optional filename prefix
     * @param fileExtension File extension: 'xlsx' or 'csv'
     * @returns Promise with export data
     */
    public getExcelFile(
        metadatas: Metadatas,
        filename: string | null = null,
        fileExtension: string = 'xlsx'
    ): Promise<any> {
        const fileType = fileExtension !== 'csv' ? 'excel' : 'csv';
        return this.get(`${this.endpoint}/export/${fileType}`, metadatas, {});
    }
}
