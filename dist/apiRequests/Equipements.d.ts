import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";
export declare class Equipements extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    appID: string;
    restrictionsite: string;
    /**
     *
     * @param equipement_id
     * @returns
     */
    getEquipementTimeline(equipement_id: number): Promise<any>;
    /**
     *
     * @param equipement_id
     * @param metadatas
     * @returns
     */
    getEquipementVerifications(equipement_id: number, metadatas?: Metadatas): Promise<any>;
    /**
     *
     * @example
       vgsdk.equipements.getById(1).then().catch();
     */
    getById(idEquipement: number): Promise<any>;
    /**
     *
     * @example
       vgsdk.equipements.getByCode("VLGE1234").then().catch();
     */
    getByCode(code: string): Promise<any>;
    getRapportAssets(metadatas: Metadatas): Promise<any>;
    /**
     * Export rapport assets file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param fileExtension File extension (xlsx or csv)
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    getRapportAssetsExcelFile(metadatas: Metadatas, fileExtension?: string): Promise<Blob>;
    /**
     */
    getAll(metadatas: Metadatas): Promise<any>;
    getEquipementsTachesActivesSites(site: string, metadatas: Metadatas): Promise<any>;
    /**
     * Get Excel file model for integration
     * @param filename Custom filename
     * @returns Promise<Blob> Returns a Blob object for Excel file download
     */
    getExcelFileModeleIntegration(filename?: string): Promise<Blob>;
    /**
     * Export equipements file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param filename Custom filename
     * @param fileExtension File extension
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    getExcelFile(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<Blob>;
    /**
     * @deprecated Use create() from parent ApiRequest class instead
     */
    create(equipements: any[]): Promise<any>;
    importModelEquipementsExcel(equipements: any[]): Promise<any>;
    sortirEquipement(equipement: any, callback: Function): Promise<void>;
    remplacerEquipement(sortie: any, maintenance: any): Promise<any>;
    /**
     */
    update(equipement: any, _options?: {
        skipVueXStorage?: boolean;
    }): Promise<any>;
    updateEquipements(equipements: any[]): Promise<any>;
    /**
     */
    remove(equipementId: number): Promise<any>;
    createEquipementsGlobauxFamilleSite(famille: string, equipements: any[]): Promise<any>;
    calculDepreciation(equipement: any): any;
    private formatDate;
    private diffMonths;
}
