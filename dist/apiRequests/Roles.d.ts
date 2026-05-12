import { ApiRequest } from "../core/ApiRequest";
/**
 * Roles service for managing user roles and permissions
 * Service for managing user roles and permissions
 */
export declare class Roles extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    private rules;
    /**
     * Get authorized functionalities for a role
     * @param role The role to get rules for
     * @returns Object containing the role rules
     */
    getRoleRules(role: string): any;
    /**
     * Get role from storage
     * @returns The role from storage
     */
    getRoleFromStorage(): string | null;
    /**
     * Check if current user can perform a specific action based on their role
     * @param rule The rule to check (dot notation like "EQUIPEMENT.CREATE")
     * @returns Boolean indicating if the action is allowed
     */
    can(rule: string): boolean;
}
