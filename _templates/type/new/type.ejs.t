---
to: src/types/<%= name %>.ts
---
<% if (hasImports && imports && imports.length > 0) { -%>
<% imports.forEach(function(imp) { -%>
import { <%= imp.type %> } from "<%= imp.path %>";
<% }); -%>

<% } -%>
/**
 * <%= description %>
 */
export interface <%= name %> {
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
 * Request interface for creating <%= name %>
 */
export interface <%= name %>CreateRequest {
<% if (properties && properties.length > 0) { -%>
<% properties.filter(prop => prop.name !== 'id' && prop.name !== 'createdAt' && prop.name !== 'updatedAt').forEach(function(prop) { -%>
    <%= prop.name %><%= prop.optional ? '?' : '' %>: <%= prop.type %>;
<% }); -%>
<% } else { -%>
    name: string;
<% } -%>
}

/**
 * Request interface for updating <%= name %>
 */
export interface <%= name %>UpdateRequest {
<% if (properties && properties.length > 0) { -%>
<% properties.filter(prop => prop.name !== 'id' && prop.name !== 'createdAt' && prop.name !== 'updatedAt').forEach(function(prop) { -%>
    <%= prop.name %>?: <%= prop.type %>;
<% }); -%>
<% } else { -%>
    name?: string;
<% } -%>
}
