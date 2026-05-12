/**
 * Service for managing user roles and permissions - Type definitions
 * //@TODO : need review - types should be defined based on actual API responses
 */
export interface Role {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
/**
 * Request interface for creating Role
 * //@TODO : need review - types should be defined based on actual API requirements
 */
export interface RoleCreateRequest {
    name: string;
}
/**
 * Request interface for updating Role
 * //@TODO : need review - types should be defined based on actual API requirements
 */
export interface RoleUpdateRequest {
    name?: string;
}
/**
 * Role permissions configuration - migrated from RolesMixins
 * Defines what each role can do across different parts of the application
 */
export declare const ROLE_RULES: {
    READ: {
        ROLE_ADMIN: boolean;
        ROLE_SUPERVISEUR: boolean;
        ROLE_TECHNICIEN: boolean;
        ROLE_SOUS_TRAITANT: boolean;
        ROLE_CHEF_EQUIPE: boolean;
        ROLE_BASIC_VERIFICATEUR: boolean;
        ROLE_BASIC: boolean;
        ROLE_TECHNICIEN_OPERATEUR: boolean;
        ROLE_FEMME_CHAMBRE: boolean;
    };
    CREATE: {
        ROLE_ADMIN: boolean;
        ROLE_SUPERVISEUR: boolean;
        ROLE_TECHNICIEN: boolean;
        ROLE_SOUS_TRAITANT: boolean;
        ROLE_CHEF_EQUIPE: boolean;
        ROLE_BASIC_VERIFICATEUR: boolean;
        ROLE_BASIC: boolean;
        ROLE_TECHNICIEN_OPERATEUR: boolean;
        ROLE_FEMME_CHAMBRE: boolean;
    };
    UPDATE: {
        ROLE_ADMIN: boolean;
        ROLE_SUPERVISEUR: boolean;
        ROLE_TECHNICIEN: boolean;
        ROLE_SOUS_TRAITANT: boolean;
        ROLE_CHEF_EQUIPE: boolean;
        ROLE_BASIC_VERIFICATEUR: boolean;
        ROLE_BASIC: boolean;
        ROLE_TECHNICIEN_OPERATEUR: boolean;
        ROLE_FEMME_CHAMBRE: boolean;
    };
    DELETE: {
        ROLE_ADMIN: boolean;
        ROLE_SUPERVISEUR: boolean;
        ROLE_TECHNICIEN: boolean;
        ROLE_SOUS_TRAITANT: boolean;
        ROLE_CHEF_EQUIPE: boolean;
        ROLE_BASIC_VERIFICATEUR: boolean;
        ROLE_BASIC: boolean;
        ROLE_TECHNICIEN_OPERATEUR: boolean;
        ROLE_FEMME_CHAMBRE: boolean;
    };
    EQUIPEMENTS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DEPLACER: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    EQUIPEMENT: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DEPLACER: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        SORTIR: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPLOAD_DOCUMENT: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_MAINTENANCE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_INTERVENTION_PREVENTIVE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_DEMANDE_INTERVENTION: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_DEMANDE_INTERVENTION_MOBILE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        READ_SYNTHESE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        READ_CONSOMMABLES: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_CONSOMMABLE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        ATTACHER_CONSOMMABLE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CHECKER: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        REMPLACER_QR_CODE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    LIEUX: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    SITES: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    PIECE: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_EQUIPEMENT: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_MAINTENANCE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_DEMANDE_INTERVENTION: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CHECK_LIEU: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    SITE: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    BATIMENT: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    REGISTRE_IMMOBILISATIONS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    INVENTAIRES: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    MOUVEMENTS_EQUIPEMENTS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CATEGORIES_EQUIPEMENTS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CATEGORIE_EQUIPEMENT: {
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CATEGORIES_LIEUX: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    PLAN_INTERACTIF: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE_MARKER: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    TACHES: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    VERIFICATIONS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    PROGRESSION: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    STATISTIQUES_VERIFICATION: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CHECKS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    DEMANDE_INTERVENTION: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    MAINTENANCES: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        TAB_EN_COURS: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        TAB_TERMINEE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        TAB_A_VENIR: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    BONS_DE_COMMANDE: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CONTRAT: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    INTERVENTIONS: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    INTERVENTION: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        VALIDATION: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        DELETE_ASSOCIATED_EQUIPEMENT: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    DASHBOARD: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CURATIF: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        PREVENTIF: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CONSOMMABLE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        BON_DE_COMMANDE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    CALENDRIER: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        ONLY_PLANNING: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    PARAMETRES: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE_PASSWORD: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UTILISATEURS: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE_UTILISATEUR: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_UTILISATEUR: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        ENTREPRISE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE_ENTREPRISE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        MAINTENANCE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        LIEUX: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        ETIQUETTES: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        BONS_DE_COMMANDE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CORPS_D_ETAT: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        EQUIPEMENTS: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    RELEVE_COMPTEUR: {
        CREATE_DATE_DEPASSEE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    LANCEMENT: {
        PAGE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
    RECHERCHE_GENERALE: {
        CREATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        UPDATE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_DEMANDE_INTERVENTION: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_MAINTENANCE: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_CHECK: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CREATE_SIGNALEMENT: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        EQUIPEMENTS_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        LIEUX_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        MAINTENANCES_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CONTRATS_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        TIERS_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CATEGORIES_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        INTERVENTIONS_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
        CONTACTS_READ: {
            ROLE_ADMIN: boolean;
            ROLE_SUPERVISEUR: boolean;
            ROLE_TECHNICIEN: boolean;
            ROLE_SOUS_TRAITANT: boolean;
            ROLE_CHEF_EQUIPE: boolean;
            ROLE_BASIC_VERIFICATEUR: boolean;
            ROLE_BASIC: boolean;
            ROLE_TECHNICIEN_OPERATEUR: boolean;
            ROLE_FEMME_CHAMBRE: boolean;
        };
    };
};
