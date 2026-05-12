/**
 * Service for managing stocks, depots and fiche demande consommables - Type definitions
 */
export interface Stock {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
/**
 * Request interface for creating Stock
 */
export interface StockCreateRequest {
    name: string;
}
/**
 * Request interface for updating Stock
 */
export interface StockUpdateRequest {
    name?: string;
}
