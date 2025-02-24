import Logger from '../utils/Logger';
import {Auth} from './Auth';
import {Metadatas} from './Metadatas';

export class HttpClient {
  auth: Auth;
  apiBaseUrl: string;

  constructor(auth: Auth, apiBaseUrl: string) {
    this.auth = auth;
    this.apiBaseUrl = apiBaseUrl;
  }

  async get(endpoint: string, metadatas: Metadatas, query: null|{ [key: string]: any }) {
    // parse query object for url queries
    let filters = "";
    if (query) {
      const queryKeys = Object.keys(query);
      queryKeys.forEach((key, index) => {
        if (index === 0) {
          filters += `?${key}=${query[key]}`;
        } else {
          filters += `&${key}=${query[key]}`;
        }
      });
    }
    if(filters == ""){
      filters = `?${this.parseMetadata(metadatas)}`;
    }else{
      filters += `&${this.parseMetadata(metadatas)}`;
    }
    return this.apiRequest(`${endpoint}${filters}`, "GET", null);
  }

  async post(endpoint: string, data: any) {
    return this.apiRequest(endpoint, "POST", data);
  }

  async put(endpoint: string, data: any) {
    return this.apiRequest(endpoint, "PUT", data);
  }

  async delete(endpoint: string) {
    return this.apiRequest(endpoint, "DELETE", null);
  }

  /**
   *
   * @param Metadatas metadatas
   * @returns string query
   */
  parseMetadata(metadatas: Metadatas) {
    let query = '{""}';
    if (metadatas) {
      query = `metadatas=${JSON.stringify(metadatas.get())}`;
    }
    return query;
  }

  async apiRequest(endpoint: string, method: string, data: any) {
    try {
      const apiKey = await this.auth.getApiKey();
      Logger.logRequest(endpoint, method, data);

      const headers: HeadersInit = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      };

      const options: RequestInit = {
        method,
        headers,
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      Logger.logResponse(responseData);
      return responseData;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}
