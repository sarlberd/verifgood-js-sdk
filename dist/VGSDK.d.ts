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
import { SharedLinks } from './apiRequests/SharedLinks';
import { Auth } from './core/Auth';
import { SdkConfiguration } from './core/sdkConfiguration';
import { Lieux } from './apiRequests/Lieux';
import { Equipements } from "./apiRequests/Equipements";
import { Categories } from './apiRequests/Categories';
import { Taches } from './apiRequests/Taches';
import { Checkpoints } from './apiRequests/Checkpoints';
import { Invitations } from './apiRequests/Invitations';
import { Verifications } from './apiRequests/Verifications';
import { Messaging } from './apiRequests/Messaging';
/**
 * @document ./howTo.md
 */
export declare class VGSDK {
    config: SdkConfiguration;
    auth: Auth;
    private services;
    constructor(configOptions: SdkConfiguration);
    private getService;
    get sharedLinks(): SharedLinks;
    get lieux(): Lieux;
    /**
     * @property {Equipements} equipements - the equipements request
     * @returns {Equipements} - the equipements request
     */
    get equipements(): Equipements;
    get categories(): Categories;
    get taches(): Taches;
    get checkpoints(): Checkpoints;
    get invitations(): Invitations;
    get messaging(): Messaging;
    /**
     * @property {Verifications} verifications - the verifications request service
     * @returns {Verifications} - the verifications request service
     */
    get verifications(): Verifications;
    /**
     * @property {Calendar} calendar - the calendar request service
     * @returns {Calendar} - the calendar request service
     */
    get calendar(): Calendar;
    /**
     * @property {BonsDeSortie} bonsdesortie - the bonsdesortie request service
     * @returns {BonsDeSortie} - the bonsdesortie request service
     */
    get bonsdesortie(): BonsDeSortie;
    /**
     * @property {BonsDentree} bonsdentree - the bonsdentree request service
     * @returns {BonsDentree} - the bonsdentree request service
     */
    get bonsdentree(): BonsDentree;
    /**
     * @property {BonsDeCommandeEntites} bonsdecommandeentites - the bonsdecommandeentites request service
     * @returns {BonsDeCommandeEntites} - the bonsdecommandeentites request service
     */
    get bonsdecommandeentites(): BonsDeCommandeEntites;
    /**
     * @property {BonDeCommandeItems} bondecommandeitems - the bondecommandeitems request service
     * @returns {BonDeCommandeItems} - the bondecommandeitems request service
     */
    get bondecommandeitems(): BonDeCommandeItems;
    /**
     * @property {Affectations} affectations - the affectations request service
     * @returns {Affectations} - the affectations request service
     */
    get affectations(): Affectations;
    /**
     * @property {BonsDeCommande} bonsdecommande - the bonsdecommande request service
     * @returns {BonsDeCommande} - the bonsdecommande request service
     */
    get bonsdecommande(): BonsDeCommande;
    /**
     * @property {Account} account - the account request service
     * @returns {Account} - the account request service
     */
    get account(): Account;
    /**
     * @property {Documents} documents - the documents request service
     * @returns {Documents} - the documents request service
     */
    get documents(): Documents;
    /**
     * @property {DeplacementsEquipements} deplacementsequipements - the deplacementsequipements request service
     * @returns {DeplacementsEquipements} - the deplacementsequipements request service
     */
    get deplacementsequipements(): DeplacementsEquipements;
    /**
     * @property {Dashboard} dashboard - the dashboard request service
     * @returns {Dashboard} - the dashboard request service
     */
    get dashboard(): Dashboard;
    /**
     * @property {CorpsDetat} corpsdetat - the corpsdetat request service
     * @returns {CorpsDetat} - the corpsdetat request service
     */
    get corpsdetat(): CorpsDetat;
    /**
     * @property {Contrat} contrat - the contrat request service
     * @returns {Contrat} - the contrat request service
     */
    get contrat(): Contrat;
    /**
     * @property {ContratEcheancier} contratecheancier - the contratecheancier request service
     * @returns {ContratEcheancier} - the contratecheancier request service
     */
    get contratecheancier(): ContratEcheancier;
    /**
     * @property {Contact} contact - the contact request service
     * @returns {Contact} - the contact request service
     */
    get contact(): Contact;
    /**
     * @property {Consommable} consommable - the consommable request service
     * @returns {Consommable} - the consommable request service
     */
    get consommable(): Consommable;
    /**
     * @property {Composant} composant - the composant request service
     * @returns {Composant} - the composant request service
     */
    get composant(): Composant;
}
