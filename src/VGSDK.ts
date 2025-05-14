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
   * @property {Verifications} verifications - the verifications request
   * @returns {Verifications} - the verifications request
   */
  get verifications(): Verifications {
    return this.getService('verifications', Verifications);
  }
}
