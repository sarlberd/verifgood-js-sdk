/**
 * Service for managing contracts - Type definitions
 */
export interface Contra {
    id?: string;
    startDate?: string;
    endDate?: string;
    noticePeriod?: number;
    isArchived?: string;
    tiers_name?: string;
    tiers_uid?: string;
    userId?: string;
}
/**
 * Request interface for creating Contra
 */
export interface ContraCreateRequest {
    startDate?: string;
    endDate?: string;
    noticePeriod?: number;
    isArchived?: string;
    tiers_name?: string;
    tiers_uid?: string;
    userId?: string;
}
/**
 * Request interface for updating Contra
 */
export interface ContraUpdateRequest {
    startDate?: string;
    endDate?: string;
    noticePeriod?: number;
    isArchived?: string;
    tiers_name?: string;
    tiers_uid?: string;
    userId?: string;
}
