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

  get lieux(): Lieux {
    return this.getService('lieux', Lieux);
  }
/**
 * @property {Equipements} equipements - the equipements request
 * @returns {Equipements} - the equipements request
 */
  get equipements(): Equipements {
    return this.getService('equipements', Equipements);
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
