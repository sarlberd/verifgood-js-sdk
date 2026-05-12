/**
 * Service for managing associations between groupe validateurs and users - Type definitions
 */
export interface GroupeValidateursUser {
    id?: string;
    validateur_id?: string;
    groupeValidateur_id?: string;
}
/**
 * Request interface for creating GroupeValidateursUser
 */
export interface GroupeValidateursUserCreateRequest {
    validateur_id?: string;
    groupeValidateur_id?: string;
}
/**
 * Request interface for updating GroupeValidateursUser
 */
export interface GroupeValidateursUserUpdateRequest {
    validateur_id?: string;
    groupeValidateur_id?: string;
}
