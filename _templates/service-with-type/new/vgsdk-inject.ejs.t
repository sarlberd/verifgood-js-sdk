---
to: src/VGSDK.ts
inject: true
after: "// INJECTED automatically by template generation"
---
<% if (addToVGSDK) { -%>

  /**
   * @property {<%= name %>} <%= name.toLowerCase() %> - the <%= name.toLowerCase() %> request service
   * @returns {<%= name %>} - the <%= name.toLowerCase() %> request service
   */
  get <%= name.toLowerCase() %>(): <%= name %> {
    return this.getService('<%= name.toLowerCase() %>', <%= name %>);
  }
<% } -%>
