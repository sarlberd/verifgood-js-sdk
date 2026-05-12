"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultOperation = createDefaultOperation;
/**
 * Factory function to create a new Operation with default values
 * Replaces the Vue.js mixin data() function
 */
function createDefaultOperation(idUser, userId) {
    return {
        operation: "",
        retourClient: "",
        dateOperation: "",
        ficheSav: null,
        __uploadedFile: null,
        __action: undefined,
        idUser: idUser,
        userId: userId,
        tiers: null
    };
}
//# sourceMappingURL=Operation.js.map