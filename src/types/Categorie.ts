import { CorpsDetat } from "./CorpsDetat";
import { libellesCategorie } from "./libellesCategorie";
export interface Category {
    userId?: string;
    isGe: boolean;
    isGenerique: boolean;
    icon?: string;
    libelleCatgorie: string;
    isInventoriable?: number;
    codeCouleur?: string;
    libellesCategorie: libellesCategorie[];
    tags?: any;
    typologieMaintenance_id?: number;
    typeSetStatutEquipement?: string;
    marque?: string;
    corpsDetats?: CorpsDetat[];
    tauxDepreciationAnnuelDefault?: string;
    prixDefault?: string;
    indiceCriticite?: string;
    sourceFinancementDefault?: string;
    refConstructeurDefault?: string;
    description?: string;
}