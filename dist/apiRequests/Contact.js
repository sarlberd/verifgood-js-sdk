"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Contact API request class
 * Service for managing contacts
 */
class Contact extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/contacts';
        this.endpointSingleton = '/api/contact';
    }
}
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map