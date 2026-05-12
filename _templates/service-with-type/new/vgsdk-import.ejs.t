---
to: src/VGSDK.ts
inject: true
after: "import \\{ Verifications \\} from \"\\./apiRequests/Verifications\";"
---
<% if (addToVGSDK) { -%>
import { <%= name %> } from "./apiRequests/<%= name %>";
<% } -%>
