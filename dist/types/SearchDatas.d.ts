/**
 * global search - Type definitions
 */
/**
 * Search entities configuration
 */
export interface SearchEntities {
    equipements?: boolean;
    lieux?: boolean;
    maintenances?: boolean;
    contrats?: boolean;
    tiers?: boolean;
    categories?: boolean;
    interventions?: boolean;
    contacts?: boolean;
}
/**
 * Search request parameters
 */
export interface SearchDataRequest {
    userId?: string | null;
    searchValue: string;
    entities?: SearchEntities;
    sites?: string | null;
    metadatas?: any;
}
/**
 * Search result item
 */
export interface SearchDataItem {
    id: number;
    type: string;
    title: string;
    subtitle?: string;
    description?: string;
    url?: string;
    [key: string]: any;
}
/**
 * Search counters
 */
export interface SearchCounters {
    [key: string]: number;
}
/**
 * Search response
 */
export interface SearchDataResponse {
    data: SearchDataItem[];
    counters: SearchCounters;
    entities: SearchEntities;
    filters: any;
}
/**
 * Legacy interfaces for compatibility
 */
export interface SearchData extends SearchDataItem {
}
export interface SearchDataCreateRequest extends SearchDataRequest {
}
export interface SearchDataUpdateRequest extends Partial<SearchDataRequest> {
}
