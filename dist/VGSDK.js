"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VGSDK = void 0;
const SharedLinks_1 = require("./apiRequests/SharedLinks");
const Auth_1 = require("./core/Auth");
const Lieux_1 = require("./apiRequests/Lieux");
const Equipements_1 = require("./apiRequests/Equipements");
const Categories_1 = require("./apiRequests/Categories");
const Taches_1 = require("./apiRequests/Taches");
const Checkpoints_1 = require("./apiRequests/Checkpoints");
const Invitations_1 = require("./apiRequests/Invitations");
const Verifications_1 = require("./apiRequests/Verifications");
const Messaging_1 = require("./apiRequests/Messaging");
/**
 * @document ./howTo.md
 */
class VGSDK {
    constructor(configOptions) {
        this.config = Object.assign({}, configOptions);
        this.auth = new Auth_1.Auth(this.config);
        this.services = {};
        console.log('VGSDK initialized', this.config);
    }
    getService(serviceName, ServiceClass) {
        if (!this.services[serviceName]) {
            this.services[serviceName] = new ServiceClass(this.auth, this.config.apiBaseUrl);
        }
        return this.services[serviceName];
    }
    get sharedLinks() {
        return this.getService('sharedLinks', SharedLinks_1.SharedLinks);
    }
    get lieux() {
        return this.getService('lieux', Lieux_1.Lieux);
    }
    /**
     * @property {Equipements} equipements - the equipements request
     * @returns {Equipements} - the equipements request
     */
    get equipements() {
        return this.getService('equipements', Equipements_1.Equipements);
    }
    get categories() {
        return this.getService('categories', Categories_1.Categories);
    }
    get taches() {
        return this.getService('taches', Taches_1.Taches);
    }
    get checkpoints() {
        return this.getService('checkpoints', Checkpoints_1.Checkpoints);
    }
    get invitations() {
        return this.getService('invitations', Invitations_1.Invitations);
    }
    get messaging() {
        return this.getService('messaging', Messaging_1.Messaging);
    }
    /**
     * @property {Verifications} verifications - the verifications request
     * @returns {Verifications} - the verifications request
     */
    get verifications() {
        return this.getService('verifications', Verifications_1.Verifications);
    }
}
exports.VGSDK = VGSDK;
