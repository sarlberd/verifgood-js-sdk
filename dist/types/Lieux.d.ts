/**
 * Lieu - Type definitions for places (organisations, sites, buildings, floors, pieces)
 */
export interface Lieu {
    id?: number;
    libelle?: string;
    libel_lieu?: string;
    path?: string;
    type_lieu?: string;
    famille?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
}
/**
 * Request interface for creating Lieu
 */
export interface LieuCreateRequest {
    libelle?: string;
    libel_lieu?: string;
    path?: string;
    type_lieu?: string;
    famille?: string;
    [key: string]: any;
}
/**
 * Request interface for updating Lieu
 */
export interface LieuUpdateRequest {
    libelle?: string;
    libel_lieu?: string;
    path?: string;
    type_lieu?: string;
    famille?: string;
    [key: string]: any;
}
/**
 * Familie color interface
 */
export interface FamilleColor {
    label: string;
    color: string;
}
