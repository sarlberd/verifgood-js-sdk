---
to: src/apiRequests/<%= name %>.ts
---
import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { <%= name.slice(0, -1) %>, <%= name.slice(0, -1) %>CreateRequest, <%= name.slice(0, -1) %>UpdateRequest } from "../types/<%= name %>";

/**
 * <%= name %> API request class
 * <%= description %>
 */
export class <%= name %> extends ApiRequest {
  endpoint: string = '<%= endpoint %>';
  endpointSingleton: string = '<%= endpointSingleton %>';
}
