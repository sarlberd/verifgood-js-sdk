---
to: src/types/<%= name %>.ts
---
/**
 * <%= description %> - Type definitions
 */
export interface <%= name.slice(0, -1) %> {
<% if (properties && properties.length > 0) { -%>
<% properties.forEach(function(prop) { -%>
    <%= prop.name %><%= prop.optional ? '?' : '' %>: <%= prop.type %>;
<% }); -%>
<% } else { -%>
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
<% } -%>
}

/**
 * Request interface for creating <%= name.slice(0, -1) %>
 */
export interface <%= name.slice(0, -1) %>CreateRequest {
<% if (properties && properties.length > 0) { -%>
<% properties.filter(prop => prop.name !== 'id' && prop.name !== 'createdAt' && prop.name !== 'updatedAt').forEach(function(prop) { -%>
    <%= prop.name %><%= prop.optional ? '?' : '' %>: <%= prop.type %>;
<% }); -%>
<% } else { -%>
    name: string;
<% } -%>
}

/**
 * Request interface for updating <%= name.slice(0, -1) %>
 */
export interface <%= name.slice(0, -1) %>UpdateRequest {
<% if (properties && properties.length > 0) { -%>
<% properties.filter(prop => prop.name !== 'id' && prop.name !== 'createdAt' && prop.name !== 'updatedAt').forEach(function(prop) { -%>
    <%= prop.name %>?: <%= prop.type %>;
<% }); -%>
<% } else { -%>
    name?: string;
<% } -%>
}
