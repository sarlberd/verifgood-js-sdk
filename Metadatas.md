# `Metadatas` Class Documentation

## Overview

The `Metadatas` class is designed to manage metadata filters, directives, counters, and columns for data queries. It provides methods to set, get, and manipulate these elements efficiently.

## Author

- **Author:** TxTony
- **Version:** 1.0
- **License:** MIT

## Constructor

### `constructor(name = null)`

Initializes a new instance of the `Metadatas` class.

**Parameters:**

- `name` (string, optional): The name of the metadata instance.

**Example:**

```javascript
const metadata = new Metadatas("exampleName");
```

## Methods

### `setFilter(name, value, action = "equals")`

Sets a filter with the specified name, value, and action.

**Parameters:**

- `name` (string): The name of the filter.
- `value` (string|integer): The value of the filter.
- `action` (string, optional): The action for the filter (default is "equals").

**Example:**

```javascript
metadata.setFilter("type", "exampleType", "contains");
```

### `setFiltersFromArray(filters)`

Sets multiple filters from an array.

**Parameters:**

- `filters` (array): An array of filter objects.

**Returns:**

- `object`: The normalized filters.

**Example:**

```javascript
const filters = [
  { attr: "type", colId: "type", value: "exampleType", action: "equals" },
  { attr: "endDate", colId: "endDate", value: "2025-12-31", action: "lessThan" }
];
metadata.setFiltersFromArray(filters);
```

### `setLimit(offset, limit)`

Sets a limit directive with the specified offset and limit.

**Parameters:**

- `offset` (integer): The offset value.
- `limit` (integer): The limit value.

**Example:**

```javascript
metadata.setLimit(0, 10);
```

### `isLimitSet()`

Checks if a limit directive is set.

**Returns:**

- `boolean`: `true` if a limit directive exists, otherwise `false`.

**Example:**

```javascript
const isLimitSet = metadata.isLimitSet();
```

### `filterExist(name)`

Checks if a filter with the specified name exists.

**Parameters:**

- `name` (string): The name of the filter.

**Returns:**

- `boolean`: `true` if the filter exists, otherwise `false`.

**Example:**

```javascript
const exists = metadata.filterExist("type");
```

### `getCounter(counter)`

Gets the value of a counter by its name.

**Parameters:**

- `counter` (string): The name of the counter.

**Returns:**

- `integer`: The value of the counter.

**Example:**

```javascript
const counterValue = metadata.getCounter("All");
```

### `deleteFilter(name)`

Deletes a filter by its name.

**Parameters:**

- `name` (string): The name of the filter.

**Example:**

```javascript
metadata.deleteFilter("type");
```

### `clearAllFilters()`

Deletes all current filters.

**Returns:**

- `this`: The current instance of the `Metadatas` class.

**Example:**

```javascript
metadata.clearAllFilters();
```

### `getFilterValue(name)`

Gets the value of a filter by its name.

**Parameters:**

- `name` (string): The name of the filter.

**Returns:**

- `any`: The value of the filter.

**Example:**

```javascript
const filterValue = metadata.getFilterValue("type");
```

### `getFilterAction(name)`

Gets the action of a filter by its name.

**Parameters:**

- `name` (string): The name of the filter.

**Returns:**

- `any`: The action of the filter.

**Example:**

```javascript
const filterAction = metadata.getFilterAction("type");
```

### `isStorable()`

Checks if the metadata instance has a name and can be stored.

**Returns:**

- `boolean`: `true` if the instance has a name, otherwise `false`.

**Example:**

```javascript
const storable = metadata.isStorable();
```

### `get()`

Formats the metadata according to server expectations.

**Returns:**

- `object`: The formatted metadata object.

**Example:**

```javascript
const formattedMetadata = metadata.get();
```

### `setName(name)`

Sets the name of the metadata instance.

**Parameters:**

- `name` (string): The name to set.

**Returns:**

- `this`: The current instance of the `Metadatas` class.

**Example:**

```javascript
metadata.setName("newName");
```

### `hasStoredFilterEqualsTo(filters)`

Compares given filters with the current filters.

**Parameters:**

- `filters` (object): The filters to compare.

**Returns:**

- `boolean`: `true` if the filters are equal, otherwise `false`.

**Example:**

```javascript
const filters = { type: { attr: "type", colId: "type", value: "exampleType", action: "equals" } };
const isEqual = metadata.hasStoredFilterEqualsTo(filters);
```

### `getName()`

Gets the name of the metadata instance.

**Returns:**

- `string`: The name of the instance.

**Example:**

```javascript
const name = metadata.getName();
```

### `setColumns(columns)`

Sets the columns for formatting data output of a query.

**Parameters:**

- `columns` (object): The columns to set.

**Returns:**

- `Metadatas`: The current instance of the `Metadatas` class.

**Example:**

```javascript
const columns = { "e.qrCode": "code", "tagEquipement": null };
metadata.setColumns(columns);
```

### `setCounters(counters)`

Sets the counters.

**Parameters:**

- `counters` (object): The counters to set.

**Returns:**

- `Metadatas`: The current instance of the `Metadatas` class.

**Example:**

```javascript
const counters = { "All": 0, "c1": 123, "c2": 5 };
metadata.setCounters(counters);
```

### `getCounters()`

Gets the counters.

**Returns:**

- `object`: The counters.

**Example:**

```javascript
const counters = metadata.getCounters();
```

### `setFilters(filters)`

Sets the filters.

**Parameters:**

- `filters` (object): The filters to set.

**Returns:**

- `Metadatas`: The current instance of the `Metadatas` class.

**Example:**

```javascript
const filters = { type: { attr: "type", colId: "type", value: "exampleType", action: "equals" } };
metadata.setFilters(filters);
```

### `getFilters()`

Gets the filters.

**Returns:**

- `object`: The filters.

**Example:**

```javascript
const filters = metadata.getFilters();
```

### `getFilter(name)`

Gets a filter by its name.

**Parameters:**

- `name` (string): The name of the filter.

**Returns:**

- `object`: The filter.

**Example:**

```javascript
const filter = metadata.getFilter("type");
```

### `setDirectives(directives)`

Sets the directives.

**Parameters:**

- `directives` (array): The directives to set.

**Returns:**

- `array`: The current instance of the `Metadatas` class.

**Example:**

```javascript
const directives = [{ name: "LIMIT", offset: 0, limit: 10 }];
metadata.setDirectives(directives);
```

## Export

The `Metadatas` class is exported as the default export.

```javascript
export default Metadatas;
```

---

## Architecture: Why Metadatas + SqlQuery is the Right Approach

### The problem it solves

In a classic backend, every API endpoint has its own filter handling: `if ($request->has('status'))`, `if ($request->has('category'))`, etc. With 119 views, 200+ filters, and constant UI evolution, that means:

- Every new filter on the frontend requires a backend code change and deployment
- Filter logic is copy-pasted across controllers
- AND/OR grouping, subqueries, pagination are re-implemented per endpoint

Metadatas eliminates all of this by introducing a **generic, declarative filter protocol** between frontend and backend.

### How it works

The frontend builds a structured JSON describing what it wants:

```json
{
  "filters": [
    {"attr": "e.libel_equipement", "value": "pompe", "action": "contains", "openParenthesis": true},
    {"attr": "e.qrCode", "value": "pompe", "action": "contains", "logicalOperator": "OR", "closeParenthesis": true},
    {"attr": "e.isHorsService", "value": 1, "action": "equals"}
  ],
  "directives": [
    {"name": "ORDER BY", "columns": ["e.libel_equipement ASC"]},
    {"name": "LIMIT", "offset": 0, "limit": 25}
  ]
}
```

On the backend, `SqlQuery` (1062 lines, `src/Services/SqlQuery.php`) translates this into parameterized SQL:

```sql
WHERE ( e.libel_equipement LIKE :elibel_equipement0 OR e.qrCode LIKE :eqrCode1 )
AND e.isHorsService = :eisHorsService2
AND e.deletedAt IS NULL
ORDER BY e.libel_equipement ASC
LIMIT 0, 25
```

The backend only writes the **base query** (with JOINs, subqueries, aggregations) and puts `:filters` and `:directives` placeholders. Metadatas fills them in.

### Filter object structure

```json
{
  "attr": "tableName.columnName",
  "value": "searchValue",
  "action": "equals",
  "logicalOperator": "AND",
  "openParenthesis": true,
  "closeParenthesis": true
}
```

- `attr` can be a string or an array of strings (multi-attribute search)
- `value` can be a single value or an array (multi-value search)
- `logicalOperator` defaults to `"AND"`, can be `"OR"`
- `openParenthesis` / `closeParenthesis` enable boolean expression grouping

### Supported actions (16 operators)

| Action | SQL Generated | Value Wrapping |
|--------|--------------|----------------|
| `equals` | `= :param` | none |
| `not_equals` | `NOT = :param` | none |
| `contains` | `LIKE :param` | `%value%` |
| `not_contains` | `NOT LIKE :param` | `%value%` |
| `start_with` | `LIKE :param` | `value%` |
| `not_start_with` | `NOT LIKE :param` | `value%` |
| `end_with` | `LIKE :param` | `%value` |
| `greater_than` | `>= :param` | none |
| `less_than` | `<= :param` | none |
| `strictly_greater_than` | `> :param` | none |
| `strictly_less_than` | `< :param` | none |
| `between` | `BETWEEN :paramMin AND :paramMax` | none |
| `in` | `IN (:param0, :param1, ...)` | none |
| `is_null` | `IS NULL` | no value needed |
| `is_not_null` | `IS NOT NULL` | no value needed |
| `match` | `REGEXP :param` | none |

### AND/OR grouping with parentheses

Filters can express full boolean logic:

```json
[
  {"attr": "c.name", "value": "aaaa", "action": "contains", "openParenthesis": true},
  {"attr": "c.refExterne", "value": "aaaa", "action": "contains", "logicalOperator": "OR"},
  {"attr": "c.numSerie", "value": "aaaa", "action": "contains", "logicalOperator": "OR", "closeParenthesis": true},
  {"attr": "c.isArchived", "value": 1, "action": "equals"}
]
```

Generates: `AND ( c.name LIKE %aaaa% OR c.refExterne LIKE %aaaa% OR c.numSerie LIKE %aaaa% ) AND c.isArchived = 1`

### Multi-value multi-attribute search

When `attr` and `value` are both arrays, SqlQuery generates the cartesian product:

```json
{
  "attr": ["name", "email", "phone"],
  "value": ["john", "admin"],
  "action": "contains"
}
```

Generates:
```sql
AND ( name LIKE %john% OR email LIKE %john% OR phone LIKE %john% )
AND ( name LIKE %admin% OR email LIKE %admin% OR phone LIKE %admin% )
```

### Directives

| Directive | Format | Example |
|-----------|--------|---------|
| `LIMIT` | `{"name": "LIMIT", "offset": 0, "limit": 25}` | `LIMIT 0, 25` |
| `ORDER BY` | `{"name": "ORDER BY", "columns": ["email ASC"]}` | `ORDER BY email ASC` |
| `GROUP BY` | `{"name": "GROUP BY", "columns": ["category"]}` | `GROUP BY category` |

### Column projection

The `columns` metadata controls SELECT field selection:

```javascript
metadata.setColumns({
  "e.qrCode": "code",         // SELECT e.qrCode AS code
  "tagEquipement": null,       // SELECT tagEquipement
  "COUNT(*)": "total"          // SELECT COUNT(*) AS total
});
```

### Built-in security

1. **Attribute sanitization** — Only allows `[a-zA-Z0-9_.()* and backticks]`. Rejects semicolons, quotes, comment markers. Throws `InvalidArgumentException` on invalid input.
2. **Value parameterization** — All values are bound through Doctrine DBAL parameter binding. Never interpolated into SQL.
3. **Automatic soft-delete** — If a table is in the `SoftDeleteEntities` whitelist (68 tables), `AND table.deletedAt IS NULL` is injected automatically. No per-endpoint code needed.

### Why this is superior for Verifgood

| Benefit | Detail |
|---------|--------|
| **Frontend autonomy** | Any developer can add a filter by sending a new filter object in the JSON. No backend deployment needed. |
| **Zero per-endpoint filter code** | All endpoints use the same `SqlQuery::filtersTranslator()`. The backend writes the base query, Metadatas handles the rest. |
| **Works with raw SQL** | Not tied to an ORM. Complex JOINs, subqueries, aggregations in base queries are preserved. |
| **Framework-agnostic on frontend** | The Metadatas JS class has no Vue/React dependency. It survives the rewrite as-is. |
| **Full boolean expression power** | AND/OR grouping with parentheses covers every filtering pattern in the app. |
| **Consistent pagination & sorting** | LIMIT, ORDER BY, GROUP BY are just directive objects in the same JSON. |

### The deliberate tradeoff

The frontend must know the database column aliases (`e.libel_equipement`, `c.tags`, `l.path`). This couples the frontend to the DB schema naming. But this is intentional — filter definitions map directly to what gets sent to the backend with no translation layer and no ambiguity. The view spec files document the exact `attr` values for every filter.

### Key backend files

| File | Role |
|------|------|
| `src/utils/Metadata.php` (57 lines) | JSON container — parses and stores filters, directives, columns |
| `src/Services/SqlQuery.php` (1062 lines) | Query builder — translates Metadatas into parameterized SQL |
| `src/Domain/SoftDeleteEntities.php` | Whitelist of 68 tables with automatic soft-delete filtering |