---
to: src/apiRequests/<%= name %>.ts
---
import { ApiRequest } from "../core/ApiRequest";

/**
 * <%= name %> API request class
 * <%= description %>
 */
export class <%= name %> extends ApiRequest {
  endpoint: string = '<%= endpoint %>';
  endpointSingleton: string = '<%= endpointSingleton %>';

<% if (hasCustomMethods && customMethodsInput && customMethodsInput.length > 0) { -%>
<% customMethodsInput.forEach(function(method) { -%>
  /**
   * <%= method.description %>
<% if (method.params && method.params.length > 0) { -%>
<% method.params.forEach(function(param) { -%>
   * @param <%= param.name %> <%= param.type %> - Parameter description
<% }); -%>
<% } -%>
   * @returns Promise with response data
   */
  async <%= method.name %>(<% if (method.params && method.params.length > 0) { %><%= method.params.map(p => `${p.name}: ${p.type}`).join(', ') %><% } %>): Promise<any> {
    // TODO: Implement <%= method.name %> logic
    return this.post(`${this.endpoint}/<%= method.name.toLowerCase() %>`, <% if (method.params && method.params.length > 0) { %>{ <%= method.params.map(p => p.name).join(', ') %> }<% } else { %>{}<% } %>);
  }

<% }); -%>
<% } -%>
}
