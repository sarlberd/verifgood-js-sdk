"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Roles_1 = require("../types/Roles");
/**
 * Roles service for managing user roles and permissions
 * Service for managing user roles and permissions
 */
class Roles extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/roles';
        this.endpointSingleton = '/api/role';
        this.rules = Roles_1.ROLE_RULES;
    }
    /**
     * Get authorized functionalities for a role
     * @param role The role to get rules for
     * @returns Object containing the role rules
     */
    getRoleRules(role) {
        //@TODO : implement getRoleRules functionality - was empty in original mixin
        return {};
    }
    /**
     * Get role from storage
     * @returns The role from storage
     */
    getRoleFromStorage() {
        //@TODO : implement getRoleFromStorage functionality - was empty in original mixin
        return null;
    }
    /**
     * Check if current user can perform a specific action based on their role
     * @param rule The rule to check (dot notation like "EQUIPEMENT.CREATE")
     * @returns Boolean indicating if the action is allowed
     */
    can(rule) {
        // Try to get app context first
        if (globalThis.$app) {
            const pathToRule = rule.split(".");
            const role = globalThis.$app.role;
            let ruleValue = this.rules;
            let ruleExist = true;
            pathToRule.forEach((partOfRule) => {
                if (ruleExist && ruleValue.hasOwnProperty(partOfRule)) {
                    ruleValue = ruleValue[partOfRule];
                }
                else {
                    ruleExist = false;
                }
            });
            if (!ruleExist) {
                console.log("-----------------------------> ! RULE EXIST", pathToRule);
            }
            return ruleExist && ruleValue && ruleValue[role] === true;
        }
        else {
            // Fallback to sessionStorage (for non-Vue components)
            const rules = this.rules;
            const userStr = sessionStorage.getItem('user');
            if (!userStr)
                return true;
            try {
                const app = JSON.parse(userStr);
                const pathToRule = rule.split(".");
                const role = app.role;
                let ruleValue = rules;
                let ruleExist = true;
                pathToRule.forEach((partOfRule) => {
                    if (ruleExist && ruleValue.hasOwnProperty(partOfRule)) {
                        ruleValue = ruleValue[partOfRule];
                    }
                    else {
                        ruleExist = false;
                    }
                });
                if (ruleExist && ruleValue && ruleValue[role] === true) {
                    return true;
                }
                else {
                    alert("You can't " + ruleValue + " in accordance to your restrictions in this app");
                    return false;
                }
            }
            catch (error) {
                console.error('Error parsing user from sessionStorage:', error);
                return false;
            }
        }
    }
}
exports.Roles = Roles;
//# sourceMappingURL=Roles.js.map