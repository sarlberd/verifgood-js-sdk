import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Accoun, AccounCreateRequest, AccounUpdateRequest } from "../types/Account";

/**
 * Account API request class
 * Service for managing user accounts
 */
export class Account extends ApiRequest {
  endpoint: string = '/api/account';
  endpointSingleton: string = '/api/account';

  constructor(auth: any, apiBaseUrl: string) {
    super(auth, apiBaseUrl);
  }

  /**
   * Updates account information
   * @param data Account data to update
   * @returns Promise with updated account data
   */
  async updateAccount(data: AccounUpdateRequest): Promise<Accoun> {
    const response = await this.apiRequest(this.endpoint, 'PUT', { datas: data });
    return response as Accoun;
  }

  /**
   * Fetches account data
   * @returns Promise with account data
   */
  async fetchAccount(): Promise<Accoun> {
    const response = await this.apiRequest(this.endpoint, 'GET', null);
    return response as Accoun;
  }

  /**
   * Creates a new account
   * @param account Account data for creation
   * @returns Promise with the created account data
   */
  async createAccount(account: AccounCreateRequest): Promise<Accoun> {
    const lang = typeof navigator !== 'undefined' ? navigator.language : 'en';
    // @TODO: The URL contains a hardcoded UUID that should be configured
    const url = `/cfae5733-8860-48d6-8346-693a93816c6e/account/${lang}`;
    const response = await this.apiRequest(url, 'POST', { datas: account });
    return response as Accoun;
  }

  // Implement required abstract methods from ApiRequest
  async getAll(metadatas: Metadatas): Promise<Accoun[]> {
    const response = await super.getAll(metadatas);
    return response as Accoun[];
  }

  async getById(id: number): Promise<Accoun> {
    const response = await super.getById(id);
    return response as Accoun;
  }

  async create(data: any): Promise<Accoun> {
    const response = await super.create(data);
    return response as Accoun;
  }

  async update(id: number, data: any): Promise<Accoun> {
    const response = await super.update(id, data);
    return response as Accoun;
  }

  async remove(id: number): Promise<void> {
    await super.remove(id);
  }
}
