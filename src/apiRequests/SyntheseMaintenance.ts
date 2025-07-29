import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";

/**
 * SyntheseMaintenance API request class
 * Handles preventive maintenance summary operations
 */
export class SyntheseMaintenance extends ApiRequest {
  endpoint: string = '/api/gamme/maintenance/preventive';
  endpointSingleton: string = '/api/gamme/maintenance/preventive';

  /**
   * Get preventive maintenance summary data
   * @param startDate string - Start date for the summary period
   * @param endDate string - End date for the summary period
   * @param metadatas Metadatas - Metadatas object for query options
   * @returns Promise<any> - Preventive maintenance summary data
   */
  public getSummary(startDate: string, endDate: string, metadatas: Metadatas): Promise<any> {
    const query = {
      userId: null, // Will be set by SDK context
      sites: null,  // Will be set by SDK context
      startDate: startDate,
      endDate: endDate
    };

    return this.get(this.endpoint, metadatas, query);
  }
}
