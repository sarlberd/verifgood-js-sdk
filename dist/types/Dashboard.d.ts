/**
 * Service for dashboard analytics and reporting - Type definitions
 */
export interface Dashboar {
    userId?: string;
    sites?: string;
    data?: any;
}
/**
 * Request interface for creating Dashboar
 */
export interface DashboarCreateRequest {
    userId?: string;
    sites?: string;
    data?: any;
}
/**
 * Request interface for updating Dashboar
 */
export interface DashboarUpdateRequest {
    userId?: string;
    sites?: string;
    data?: any;
}
