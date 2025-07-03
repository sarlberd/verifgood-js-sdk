"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VGSDK = void 0;
const Documents_1 = require("./apiRequests/Documents");
const DeplacementsEquipements_1 = require("./apiRequests/DeplacementsEquipements");
const Dashboard_1 = require("./apiRequests/Dashboard");
const CorpsDetat_1 = require("./apiRequests/CorpsDetat");
const Contrat_1 = require("./apiRequests/Contrat");
const ContratEcheancier_1 = require("./apiRequests/ContratEcheancier");
const Contact_1 = require("./apiRequests/Contact");
const Consommable_1 = require("./apiRequests/Consommable");
const Composant_1 = require("./apiRequests/Composant");
const Calendar_1 = require("./apiRequests/Calendar");
const BonsDeSortie_1 = require("./apiRequests/BonsDeSortie");
const BonsDentree_1 = require("./apiRequests/BonsDentree");
const BonsDeCommandeEntites_1 = require("./apiRequests/BonsDeCommandeEntites");
const BonDeCommandeItems_1 = require("./apiRequests/BonDeCommandeItems");
const Affectations_1 = require("./apiRequests/Affectations");
const BonsDeCommande_1 = require("./apiRequests/BonsDeCommande");
const Account_1 = require("./apiRequests/Account");
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
        this.config = { ...configOptions };
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
     * @property {Verifications} verifications - the verifications request service
     * @returns {Verifications} - the verifications request service
     */
    get verifications() {
        return this.getService('verifications', Verifications_1.Verifications);
    }
    /**
     * @property {Calendar} calendar - the calendar request service
     * @returns {Calendar} - the calendar request service
     */
    get calendar() {
        return this.getService('calendar', Calendar_1.Calendar);
    }
    /**
     * @property {BonsDeSortie} bonsdesortie - the bonsdesortie request service
     * @returns {BonsDeSortie} - the bonsdesortie request service
     */
    get bonsdesortie() {
        return this.getService('bonsdesortie', BonsDeSortie_1.BonsDeSortie);
    }
    /**
     * @property {BonsDentree} bonsdentree - the bonsdentree request service
     * @returns {BonsDentree} - the bonsdentree request service
     */
    get bonsdentree() {
        return this.getService('bonsdentree', BonsDentree_1.BonsDentree);
    }
    /**
     * @property {BonsDeCommandeEntites} bonsdecommandeentites - the bonsdecommandeentites request service
     * @returns {BonsDeCommandeEntites} - the bonsdecommandeentites request service
     */
    get bonsdecommandeentites() {
        return this.getService('bonsdecommandeentites', BonsDeCommandeEntites_1.BonsDeCommandeEntites);
    }
    /**
     * @property {BonDeCommandeItems} bondecommandeitems - the bondecommandeitems request service
     * @returns {BonDeCommandeItems} - the bondecommandeitems request service
     */
    get bondecommandeitems() {
        return this.getService('bondecommandeitems', BonDeCommandeItems_1.BonDeCommandeItems);
    }
    /**
     * @property {Affectations} affectations - the affectations request service
     * @returns {Affectations} - the affectations request service
     */
    get affectations() {
        return this.getService('affectations', Affectations_1.Affectations);
    }
    /**
     * @property {BonsDeCommande} bonsdecommande - the bonsdecommande request service
     * @returns {BonsDeCommande} - the bonsdecommande request service
     */
    get bonsdecommande() {
        return this.getService('bonsdecommande', BonsDeCommande_1.BonsDeCommande);
    }
    /**
     * @property {Account} account - the account request service
     * @returns {Account} - the account request service
     */
    get account() {
        return this.getService('account', Account_1.Account);
    }
    // INJECTED automatically by template generation
    /**
     * @property {Documents} documents - the documents request service
     * @returns {Documents} - the documents request service
     */
    get documents() {
        return this.getService('documents', Documents_1.Documents);
    }
    /**
     * @property {DeplacementsEquipements} deplacementsequipements - the deplacementsequipements request service
     * @returns {DeplacementsEquipements} - the deplacementsequipements request service
     */
    get deplacementsequipements() {
        return this.getService('deplacementsequipements', DeplacementsEquipements_1.DeplacementsEquipements);
    }
    /**
     * @property {Dashboard} dashboard - the dashboard request service
     * @returns {Dashboard} - the dashboard request service
     */
    get dashboard() {
        return this.getService('dashboard', Dashboard_1.Dashboard);
    }
    /**
     * @property {CorpsDetat} corpsdetat - the corpsdetat request service
     * @returns {CorpsDetat} - the corpsdetat request service
     */
    get corpsdetat() {
        return this.getService('corpsdetat', CorpsDetat_1.CorpsDetat);
    }
    /**
     * @property {Contrat} contrat - the contrat request service
     * @returns {Contrat} - the contrat request service
     */
    get contrat() {
        return this.getService('contrat', Contrat_1.Contrat);
    }
    /**
     * @property {ContratEcheancier} contratecheancier - the contratecheancier request service
     * @returns {ContratEcheancier} - the contratecheancier request service
     */
    get contratecheancier() {
        return this.getService('contratecheancier', ContratEcheancier_1.ContratEcheancier);
    }
    /**
     * @property {Contact} contact - the contact request service
     * @returns {Contact} - the contact request service
     */
    get contact() {
        return this.getService('contact', Contact_1.Contact);
    }
    /**
     * @property {Consommable} consommable - the consommable request service
     * @returns {Consommable} - the consommable request service
     */
    get consommable() {
        return this.getService('consommable', Consommable_1.Consommable);
    }
    /**
     * @property {Composant} composant - the composant request service
     * @returns {Composant} - the composant request service
     */
    get composant() {
        return this.getService('composant', Composant_1.Composant);
    }
}
exports.VGSDK = VGSDK;
//# sourceMappingURL=VGSDK.js.map