import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";
export declare class Equipements extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    appID: string;
    restrictionsite: string;
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
    getRapportAssetsExcelFile(metadatas: Metadatas, fileExtension?: string): Promise<void>;
    getAll(metadatas: Metadatas): Promise<any>;
    getEquipementsTachesActivesSites(site: string, metadatas: Metadatas): Promise<any>;
    getExcelFileModeleIntegration(filename?: string): Promise<void>;
    getExcelFile(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<void>;
    create(equipements: any[]): Promise<any>;
    importModelEquipementsExcel(equipements: any[]): Promise<any>;
    sortirEquipement(equipement: any, callback: Function): Promise<void>;
    remplacerEquipement(sortie: any, maintenance: any): Promise<any>;
    update(equipement: any, _options?: {
        skipVueXStorage?: boolean;
    }): Promise<any>;
    updateEquipements(equipements: any[]): Promise<any>;
    remove(equipementId: number): Promise<any>;
    createEquipementsGlobauxFamilleSite(famille: string, equipements: any[]): Promise<any>;
    calculDepreciation(equipement: any): any;
    private formatDate;
    private diffMonths;
}
