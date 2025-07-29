import { Stripe } from "./apiRequests/Stripe";

import { SyntheseMaintenance } from "./apiRequests/SyntheseMaintenance";

import { Stocks } from "./apiRequests/Stocks";

import { Statistiques } from "./apiRequests/Statistiques";

import { SortieEquipement } from "./apiRequests/SortieEquipement";

import { SearchDatas } from "./apiRequests/SearchDatas";

import { Roles } from "./apiRequests/Roles";

import { Reponses } from "./apiRequests/Reponses";

import { Maintenance } from "./apiRequests/Maintenance";
import { MouvementsEquipements } from "./apiRequests/MouvementsEquipements";
import { Parametres } from "./apiRequests/Parametres";
import { PersonalParameters } from "./apiRequests/PersonalParameters";
import { PlanInteractif } from "./apiRequests/PlanInteractif";
import { PlanMaintenance } from "./apiRequests/PlanMaintenance";

import { Operation } from "./apiRequests/Operation";
import { LibelServices } from "./apiRequests/LibelServices";
import { LibelProblem } from "./apiRequests/LibelProblem";
import { LibellesCategorie } from "./apiRequests/LibellesCategorie";
import { Inventaire } from "./apiRequests/Inventaire";
import { Interventions } from "./apiRequests/Interventions";
import { IntegrationsDonnees } from "./apiRequests/IntegrationsDonnees";
import { GroupeValidateursUsers } from "./apiRequests/GroupeValidateursUsers";
import { GroupeValidateurs } from "./apiRequests/GroupeValidateurs";
import { FicheDemandeConsommables } from "./apiRequests/FicheDemandeConsommables";
import { Documents } from "./apiRequests/Documents";
import { DeplacementsEquipements } from "./apiRequests/DeplacementsEquipements";
import { Dashboard } from "./apiRequests/Dashboard";
import { CorpsDetat } from "./apiRequests/CorpsDetat";
import { Contrat } from "./apiRequests/Contrat";
import { ContratEcheancier } from "./apiRequests/ContratEcheancier";
import { Contact } from "./apiRequests/Contact";
import { Consommable } from "./apiRequests/Consommable";
import { Composant } from "./apiRequests/Composant";
import { Calendar } from "./apiRequests/Calendar";
import { BonsDeSortie } from "./apiRequests/BonsDeSortie";
import { BonsDentree } from "./apiRequests/BonsDentree";
import { BonsDeCommandeEntites } from "./apiRequests/BonsDeCommandeEntites";
import { BonDeCommandeItems } from "./apiRequests/BonDeCommandeItems";
import { Affectations } from "./apiRequests/Affectations";
import { BonsDeCommande } from "./apiRequests/BonsDeCommande";
import { Account } from "./apiRequests/Account";
import {SharedLinks} from './apiRequests/SharedLinks';
import {Auth} from './core/Auth';
import {SdkConfiguration} from './core/sdkConfiguration';
import {Lieux} from './apiRequests/Lieux';
import {Equipements} from "./apiRequests/Equipements";
import {Categories} from './apiRequests/Categories';
import {Taches} from './apiRequests/Taches';
import {Checkpoints} from './apiRequests/Checkpoints';
import {Invitations} from './apiRequests/Invitations';
import {Verifications} from './apiRequests/Verifications';
import {Messaging} from './apiRequests/Messaging';
/**
 * @document ./howTo.md
 */
export class VGSDK {
  config: SdkConfiguration;
  auth: Auth;
  private services: { [key: string]: any };

  constructor(configOptions: SdkConfiguration) {
    this.config = { ...configOptions };
    this.auth = new Auth(this.config);
    this.services = {};
    console.log('VGSDK initialized', this.config);
  }

  private getService<T>(serviceName: string, ServiceClass: new (auth: Auth, apiBaseUrl: string) => T): T {
    if (!this.services[serviceName]) {
      this.services[serviceName] = new ServiceClass(this.auth, this.config.apiBaseUrl);
    }
    return this.services[serviceName];
  }

  get sharedLinks(): SharedLinks {
    return this.getService('sharedLinks', SharedLinks);
  }
  get categories(): Categories {
    return this.getService('categories', Categories);
  }

  get taches(): Taches {
    return this.getService('taches', Taches);
  }

  get checkpoints(): Checkpoints {
    return this.getService('checkpoints', Checkpoints);
  }
  
  get invitations(): Invitations {
    return this.getService('invitations', Invitations);
  }
  get messaging(): Messaging {
    return this.getService('messaging', Messaging);
  }
  /**
   * @property {Verifications} verifications - the verifications request service
   * @returns {Verifications} - the verifications request service
   */
  get verifications(): Verifications {
    return this.getService('verifications', Verifications);
  }

  /**
   * @property {Calendar} calendar - the calendar request service
   * @returns {Calendar} - the calendar request service
   */
  get calendar(): Calendar {
    return this.getService('calendar', Calendar);
  }

  /**
   * @property {BonsDeSortie} bonsdesortie - the bonsdesortie request service
   * @returns {BonsDeSortie} - the bonsdesortie request service
   */
  get bonsdesortie(): BonsDeSortie {
    return this.getService('bonsdesortie', BonsDeSortie);
  }

  /**
   * @property {BonsDentree} bonsdentree - the bonsdentree request service
   * @returns {BonsDentree} - the bonsdentree request service
   */
  get bonsdentree(): BonsDentree {
    return this.getService('bonsdentree', BonsDentree);
  }

  /**
   * @property {BonsDeCommandeEntites} bonsdecommandeentites - the bonsdecommandeentites request service
   * @returns {BonsDeCommandeEntites} - the bonsdecommandeentites request service
   */
  get bonsdecommandeentites(): BonsDeCommandeEntites {
    return this.getService('bonsdecommandeentites', BonsDeCommandeEntites);
  }

  /**
   * @property {BonDeCommandeItems} bondecommandeitems - the bondecommandeitems request service
   * @returns {BonDeCommandeItems} - the bondecommandeitems request service
   */
  get bondecommandeitems(): BonDeCommandeItems {
    return this.getService('bondecommandeitems', BonDeCommandeItems);
  }

  /**
   * @property {Affectations} affectations - the affectations request service
   * @returns {Affectations} - the affectations request service
   */
  get affectations(): Affectations {
    return this.getService('affectations', Affectations);
  }

  /**
   * @property {BonsDeCommande} bonsdecommande - the bonsdecommande request service
   * @returns {BonsDeCommande} - the bonsdecommande request service
   */
  get bonsdecommande(): BonsDeCommande {
    return this.getService('bonsdecommande', BonsDeCommande);
  }

  /**
   * @property {Account} account - the account request service
   * @returns {Account} - the account request service
   */
  get account(): Account {
    return this.getService('account', Account);
  }

  // INJECTED automatically by template generation

  /**
   * @property {Stripe} stripe - the stripe request service
   * @returns {Stripe} - the stripe request service
   */
  get stripe(): Stripe {
    return this.getService('stripe', Stripe);
  }


  /**
   * @property {SyntheseMaintenance} synthesemaintenance - the synthesemaintenance request service
   * @returns {SyntheseMaintenance} - the synthesemaintenance request service
   */
  get synthesemaintenance(): SyntheseMaintenance {
    return this.getService('synthesemaintenance', SyntheseMaintenance);
  }


  /**
   * @property {Stocks} stocks - the stocks request service
   * @returns {Stocks} - the stocks request service
   */
  get stocks(): Stocks {
    return this.getService('stocks', Stocks);
  }


  /**
   * @property {Statistiques} statistiques - the statistiques request service
   * @returns {Statistiques} - the statistiques request service
   */
  get statistiques(): Statistiques {
    return this.getService('statistiques', Statistiques);
  }


  /**
   * @property {SortieEquipement} sortieequipement - the sortieequipement request service
   * @returns {SortieEquipement} - the sortieequipement request service
   */
  get sortieequipement(): SortieEquipement {
    return this.getService('sortieequipement', SortieEquipement);
  }


  /**
   * @property {SearchDatas} searchdatas - the searchdatas request service
   * @returns {SearchDatas} - the searchdatas request service
   */
  get searchdatas(): SearchDatas {
    return this.getService('searchdatas', SearchDatas);
  }


  /**
   * @property {Roles} roles - the roles request service
   * @returns {Roles} - the roles request service
   */
  get roles(): Roles {
    return this.getService('roles', Roles);
  }


  /**
   * @property {Reponses} reponses - the reponses request service
   * @returns {Reponses} - the reponses request service
   */
  get reponses(): Reponses {
    return this.getService('reponses', Reponses);
  }


  /**
   * @property {Maintenance} maintenance - the maintenance request service
   * @returns {Maintenance} - the maintenance request service
   */
  get maintenance(): Maintenance {
    return this.getService('maintenance', Maintenance);
  }

  /**
   * @property {MouvementsEquipements} mouvementsEquipements - the equipment movements request service
   * @returns {MouvementsEquipements} - the equipment movements request service
   */
  get mouvementsEquipements(): MouvementsEquipements {
    return this.getService('mouvementsEquipements', MouvementsEquipements);
  }

  /**
   * @property {Parametres} parametres - the application parameters request service
   * @returns {Parametres} - the application parameters request service
   */
  get parametres(): Parametres {
    return this.getService('parametres', Parametres);
  }

  /**
   * @property {PersonalParameters} personalParameters - the personal parameters request service
   * @returns {PersonalParameters} - the personal parameters request service
   */
  get personalParameters(): PersonalParameters {
    return this.getService('personalParameters', PersonalParameters);
  }

  /**
   * @property {PlanInteractif} planInteractif - the interactive plan request service
   * @returns {PlanInteractif} - the interactive plan request service
   */
  get planInteractif(): PlanInteractif {
    return this.getService('planInteractif', PlanInteractif);
  }

  /**
   * @property {PlanMaintenance} planMaintenance - the maintenance plan request service
   * @returns {PlanMaintenance} - the maintenance plan request service
   */
  get planMaintenance(): PlanMaintenance {
    return this.getService('planMaintenance', PlanMaintenance);
  }

  /**
   * @property {Operation} operation - the operation request service
   * @returns {Operation} - the operation request service
   */
  get operation(): Operation {
    return this.getService('operation', Operation);
  }


  /**
   * @property {Lieux} lieux - the lieux request service
   * @returns {Lieux} - the lieux request service
   */
  get lieux(): Lieux {
    return this.getService('lieux', Lieux);
  }


  /**
   * @property {LibelServices} libelservices - the libelservices request service
   * @returns {LibelServices} - the libelservices request service
   */
  get libelservices(): LibelServices {
    return this.getService('libelservices', LibelServices);
  }


  /**
   * @property {LibelProblem} libelproblem - the libelproblem request service
   * @returns {LibelProblem} - the libelproblem request service
   */
  get libelproblem(): LibelProblem {
    return this.getService('libelproblem', LibelProblem);
  }


  /**
   * @property {LibellesCategorie} libellescategorie - the libellescategorie request service
   * @returns {LibellesCategorie} - the libellescategorie request service
   */
  get libellescategorie(): LibellesCategorie {
    return this.getService('libellescategorie', LibellesCategorie);
  }


  /**
   * @property {Inventaire} inventaire - the inventaire request service
   * @returns {Inventaire} - the inventaire request service
   */
  get inventaire(): Inventaire {
    return this.getService('inventaire', Inventaire);
  }


  /**
   * @property {Interventions} interventions - the interventions request service
   * @returns {Interventions} - the interventions request service
   */
  get interventions(): Interventions {
    return this.getService('interventions', Interventions);
  }


  /**
   * @property {IntegrationsDonnees} integrationsdonnees - the integrationsdonnees request service
   * @returns {IntegrationsDonnees} - the integrationsdonnees request service
   */
  get integrationsdonnees(): IntegrationsDonnees {
    return this.getService('integrationsdonnees', IntegrationsDonnees);
  }


  /**
   * @property {GroupeValidateursUsers} groupevalidateursusers - the groupevalidateursusers request service
   * @returns {GroupeValidateursUsers} - the groupevalidateursusers request service
   */
  get groupevalidateursusers(): GroupeValidateursUsers {
    return this.getService('groupevalidateursusers', GroupeValidateursUsers);
  }


  /**
   * @property {GroupeValidateurs} groupevalidateurs - the groupevalidateurs request service
   * @returns {GroupeValidateurs} - the groupevalidateurs request service
   */
  get groupevalidateurs(): GroupeValidateurs {
    return this.getService('groupevalidateurs', GroupeValidateurs);
  }


  /**
   * @property {FicheDemandeConsommables} fichedemandeconsommables - the fichedemandeconsommables request service
   * @returns {FicheDemandeConsommables} - the fichedemandeconsommables request service
   */
  get fichedemandeconsommables(): FicheDemandeConsommables {
    return this.getService('fichedemandeconsommables', FicheDemandeConsommables);
  }


  /**
   * @property {Equipements} equipements - the equipements request service
   * @returns {Equipements} - the equipements request service
   */
  get equipements(): Equipements {
    return this.getService('equipements', Equipements);
  }


  /**
   * @property {Documents} documents - the documents request service
   * @returns {Documents} - the documents request service
   */
  get documents(): Documents {
    return this.getService('documents', Documents);
  }


  /**
   * @property {DeplacementsEquipements} deplacementsequipements - the deplacementsequipements request service
   * @returns {DeplacementsEquipements} - the deplacementsequipements request service
   */
  get deplacementsequipements(): DeplacementsEquipements {
    return this.getService('deplacementsequipements', DeplacementsEquipements);
  }


  /**
   * @property {Dashboard} dashboard - the dashboard request service
   * @returns {Dashboard} - the dashboard request service
   */
  get dashboard(): Dashboard {
    return this.getService('dashboard', Dashboard);
  }


  /**
   * @property {CorpsDetat} corpsdetat - the corpsdetat request service
   * @returns {CorpsDetat} - the corpsdetat request service
   */
  get corpsdetat(): CorpsDetat {
    return this.getService('corpsdetat', CorpsDetat);
  }


  /**
   * @property {Contrat} contrat - the contrat request service
   * @returns {Contrat} - the contrat request service
   */
  get contrat(): Contrat {
    return this.getService('contrat', Contrat);
  }


  /**
   * @property {ContratEcheancier} contratecheancier - the contratecheancier request service
   * @returns {ContratEcheancier} - the contratecheancier request service
   */
  get contratecheancier(): ContratEcheancier {
    return this.getService('contratecheancier', ContratEcheancier);
  }


  /**
   * @property {Contact} contact - the contact request service
   * @returns {Contact} - the contact request service
   */
  get contact(): Contact {
    return this.getService('contact', Contact);
  }


  /**
   * @property {Consommable} consommable - the consommable request service
   * @returns {Consommable} - the consommable request service
   */
  get consommable(): Consommable {
    return this.getService('consommable', Consommable);
  }


  /**
   * @property {Composant} composant - the composant request service
   * @returns {Composant} - the composant request service
   */
  get composant(): Composant {
    return this.getService('composant', Composant);
  }

  
}
