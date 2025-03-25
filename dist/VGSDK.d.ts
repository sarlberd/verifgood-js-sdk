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
    /**
     * @property {Verifications} verifications - the verifications request
     * @returns {Verifications} - the verifications request
     */
    get verifications(): Verifications;
}
