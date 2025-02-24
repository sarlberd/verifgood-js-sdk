import {ApiRequest} from "../core/ApiRequest";


export class Categories extends ApiRequest {
  endpoint: string = '/api/categories';
  endpointSingleton: string = '/api/categorie';

  async associateComposant(categorie_id: number, composant: any) {
    return this.post(`${this.endpoint}/${categorie_id}/composants`, { datas: [composant] });
  }
  async desassociateComposant(composant_categorie_id: number) {
    return this.delete(`/composant-categorie/${composant_categorie_id}`);
  }
}

