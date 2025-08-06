"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VGSDK = void 0;
const Tiers_1 = require("./apiRequests/Tiers");
const Tags_1 = require("./apiRequests/Tags");
const Stripe_1 = require("./apiRequests/Stripe");
const SyntheseMaintenance_1 = require("./apiRequests/SyntheseMaintenance");
const Stocks_1 = require("./apiRequests/Stocks");
const Statistiques_1 = require("./apiRequests/Statistiques");
const SortieEquipement_1 = require("./apiRequests/SortieEquipement");
const SearchDatas_1 = require("./apiRequests/SearchDatas");
const Roles_1 = require("./apiRequests/Roles");
const Reponses_1 = require("./apiRequests/Reponses");
const Maintenance_1 = require("./apiRequests/Maintenance");
const MouvementsEquipements_1 = require("./apiRequests/MouvementsEquipements");
const Parametres_1 = require("./apiRequests/Parametres");
const PersonalParameters_1 = require("./apiRequests/PersonalParameters");
const PlanInteractif_1 = require("./apiRequests/PlanInteractif");
const PlanMaintenance_1 = require("./apiRequests/PlanMaintenance");
const Operation_1 = require("./apiRequests/Operation");
const LibelServices_1 = require("./apiRequests/LibelServices");
const LibelProblem_1 = require("./apiRequests/LibelProblem");
const LibellesCategorie_1 = require("./apiRequests/LibellesCategorie");
const Inventaire_1 = require("./apiRequests/Inventaire");
const Interventions_1 = require("./apiRequests/Interventions");
const IntegrationsDonnees_1 = require("./apiRequests/IntegrationsDonnees");
const GroupeValidateursUsers_1 = require("./apiRequests/GroupeValidateursUsers");
const GroupeValidateurs_1 = require("./apiRequests/GroupeValidateurs");
const FicheDemandeConsommables_1 = require("./apiRequests/FicheDemandeConsommables");
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
     * @property {Tiers} tiers - the tiers request service
     * @returns {Tiers} - the tiers request service
     */
    get tiers() {
        return this.getService('tiers', Tiers_1.Tiers);
    }
    /**
     * @property {Tags} tags - the tags request service
     * @returns {Tags} - the tags request service
     */
    get tags() {
        return this.getService('tags', Tags_1.Tags);
    }
    /**
     * @property {Stripe} stripe - the stripe request service
     * @returns {Stripe} - the stripe request service
     */
    get stripe() {
        return this.getService('stripe', Stripe_1.Stripe);
    }
    /**
     * @property {SyntheseMaintenance} synthesemaintenance - the synthesemaintenance request service
     * @returns {SyntheseMaintenance} - the synthesemaintenance request service
     */
    get synthesemaintenance() {
        return this.getService('synthesemaintenance', SyntheseMaintenance_1.SyntheseMaintenance);
    }
    /**
     * @property {Stocks} stocks - the stocks request service
     * @returns {Stocks} - the stocks request service
     */
    get stocks() {
        return this.getService('stocks', Stocks_1.Stocks);
    }
    /**
     * @property {Statistiques} statistiques - the statistiques request service
     * @returns {Statistiques} - the statistiques request service
     */
    get statistiques() {
        return this.getService('statistiques', Statistiques_1.Statistiques);
    }
    /**
     * @property {SortieEquipement} sortieequipement - the sortieequipement request service
     * @returns {SortieEquipement} - the sortieequipement request service
     */
    get sortieequipement() {
        return this.getService('sortieequipement', SortieEquipement_1.SortieEquipement);
    }
    /**
     * @property {SearchDatas} searchdatas - the searchdatas request service
     * @returns {SearchDatas} - the searchdatas request service
     */
    get searchdatas() {
        return this.getService('searchdatas', SearchDatas_1.SearchDatas);
    }
    /**
     * @property {Roles} roles - the roles request service
     * @returns {Roles} - the roles request service
     */
    get roles() {
        return this.getService('roles', Roles_1.Roles);
    }
    /**
     * @property {Reponses} reponses - the reponses request service
     * @returns {Reponses} - the reponses request service
     */
    get reponses() {
        return this.getService('reponses', Reponses_1.Reponses);
    }
    /**
     * @property {Maintenance} maintenance - the maintenance request service
     * @returns {Maintenance} - the maintenance request service
     */
    get maintenance() {
        return this.getService('maintenance', Maintenance_1.Maintenance);
    }
    /**
     * @property {MouvementsEquipements} mouvementsEquipements - the equipment movements request service
     * @returns {MouvementsEquipements} - the equipment movements request service
     */
    get mouvementsEquipements() {
        return this.getService('mouvementsEquipements', MouvementsEquipements_1.MouvementsEquipements);
    }
    /**
     * @property {Parametres} parametres - the application parameters request service
     * @returns {Parametres} - the application parameters request service
     */
    get parametres() {
        return this.getService('parametres', Parametres_1.Parametres);
    }
    /**
     * @property {PersonalParameters} personalParameters - the personal parameters request service
     * @returns {PersonalParameters} - the personal parameters request service
     */
    get personalParameters() {
        return this.getService('personalParameters', PersonalParameters_1.PersonalParameters);
    }
    /**
     * @property {PlanInteractif} planInteractif - the interactive plan request service
     * @returns {PlanInteractif} - the interactive plan request service
     */
    get planInteractif() {
        return this.getService('planInteractif', PlanInteractif_1.PlanInteractif);
    }
    /**
     * @property {PlanMaintenance} planMaintenance - the maintenance plan request service
     * @returns {PlanMaintenance} - the maintenance plan request service
     */
    get planMaintenance() {
        return this.getService('planMaintenance', PlanMaintenance_1.PlanMaintenance);
    }
    /**
     * @property {Operation} operation - the operation request service
     * @returns {Operation} - the operation request service
     */
    get operation() {
        return this.getService('operation', Operation_1.Operation);
    }
    /**
     * @property {Lieux} lieux - the lieux request service
     * @returns {Lieux} - the lieux request service
     */
    get lieux() {
        return this.getService('lieux', Lieux_1.Lieux);
    }
    /**
     * @property {LibelServices} libelservices - the libelservices request service
     * @returns {LibelServices} - the libelservices request service
     */
    get libelservices() {
        return this.getService('libelservices', LibelServices_1.LibelServices);
    }
    /**
     * @property {LibelProblem} libelproblem - the libelproblem request service
     * @returns {LibelProblem} - the libelproblem request service
     */
    get libelproblem() {
        return this.getService('libelproblem', LibelProblem_1.LibelProblem);
    }
    /**
     * @property {LibellesCategorie} libellescategorie - the libellescategorie request service
     * @returns {LibellesCategorie} - the libellescategorie request service
     */
    get libellescategorie() {
        return this.getService('libellescategorie', LibellesCategorie_1.LibellesCategorie);
    }
    /**
     * @property {Inventaire} inventaire - the inventaire request service
     * @returns {Inventaire} - the inventaire request service
     */
    get inventaire() {
        return this.getService('inventaire', Inventaire_1.Inventaire);
    }
    /**
     * @property {Interventions} interventions - the interventions request service
     * @returns {Interventions} - the interventions request service
     */
    get interventions() {
        return this.getService('interventions', Interventions_1.Interventions);
    }
    /**
     * @property {IntegrationsDonnees} integrationsdonnees - the integrationsdonnees request service
     * @returns {IntegrationsDonnees} - the integrationsdonnees request service
     */
    get integrationsdonnees() {
        return this.getService('integrationsdonnees', IntegrationsDonnees_1.IntegrationsDonnees);
    }
    /**
     * @property {GroupeValidateursUsers} groupevalidateursusers - the groupevalidateursusers request service
     * @returns {GroupeValidateursUsers} - the groupevalidateursusers request service
     */
    get groupevalidateursusers() {
        return this.getService('groupevalidateursusers', GroupeValidateursUsers_1.GroupeValidateursUsers);
    }
    /**
     * @property {GroupeValidateurs} groupevalidateurs - the groupevalidateurs request service
     * @returns {GroupeValidateurs} - the groupevalidateurs request service
     */
    get groupevalidateurs() {
        return this.getService('groupevalidateurs', GroupeValidateurs_1.GroupeValidateurs);
    }
    /**
     * @property {FicheDemandeConsommables} fichedemandeconsommables - the fichedemandeconsommables request service
     * @returns {FicheDemandeConsommables} - the fichedemandeconsommables request service
     */
    get fichedemandeconsommables() {
        return this.getService('fichedemandeconsommables', FicheDemandeConsommables_1.FicheDemandeConsommables);
    }
    /**
     * @property {Equipements} equipements - the equipements request service
     * @returns {Equipements} - the equipements request service
     */
    get equipements() {
        return this.getService('equipements', Equipements_1.Equipements);
    }
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