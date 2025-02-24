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

Enjoy using the `Metadatas` class! If you have any questions or need further assistance, feel free to reach out.