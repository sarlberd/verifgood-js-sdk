# VGSDK Class Documentation

## Overview

The `VGSDK` class provides a convenient interface for accessing various services in the Verifgood SDK. It includes lazy instantiation of services such as `SharedLinks`, `Lieux`, `Equipements`, `Categories`, `Taches`, and `Checkpoints`.

## Constructor

### `constructor(configOptions: SdkConfiguration)`

Initializes a new instance of the `VGSDK` class with the provided configuration options.

**Parameters:**

- `configOptions` (SdkConfiguration): The configuration options for the SDK.

**Example:**

```typescript
import VGSDK from './path/to/VGSDK';
import SdkConfiguration from './path/to/sdkConfiguration';

const configOptions: SdkConfiguration = {
  apiBaseUrl: 'https://api.example.com',
  apiKey: 'your-api-key'
};

const vgsdk = new VGSDK(configOptions);
```

## Services

### `sharedLinks`

Provides access to the `SharedLinks` service.

**Example:**

```typescript
const sharedLinks = vgsdk.sharedLinks;
// Use sharedLinks to interact with the SharedLinks API
```

### `lieux`

Provides access to the `Lieux` service.

**Example:**

```typescript
const lieux = vgsdk.lieux;
// Use lieux to interact with the Lieux API
```

### `equipements`

Provides access to the `Equipements` service.

**Example:**

```typescript
const equipements = vgsdk.equipements;
// Use equipements to interact with the Equipements API
```

### `categories`

Provides access to the `Categories` service.

**Example:**

```typescript
const categories = vgsdk.categories;
// Use categories to interact with the Categories API
```

### `taches`

Provides access to the `Taches` service.

**Example:**

```typescript
const taches = vgsdk.taches;
// Use taches to interact with the Taches API
```

### `checkpoints`

Provides access to the `Checkpoints` service.

**Example:**

```typescript
const checkpoints = vgsdk.checkpoints;
// Use checkpoints to interact with the Checkpoints API
```

## API Requests

### SharedLinks

**Endpoint:** `/shared-links`

**Example:**

```typescript
const sharedLinks = vgsdk.sharedLinks;
sharedLinks.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

### Lieux

**Endpoint:** `/lieux`

**Example:**

```typescript
const lieux = vgsdk.lieux;
lieux.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

### Equipements

**Endpoint:** `/equipements`

**Example:**

```typescript
const equipements = vgsdk.equipements;
equipements.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

### Categories

**Endpoint:** `/categories`

**Example:**

```typescript
const categories = vgsdk.categories;
categories.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

### Taches

**Endpoint:** `/taches`

**Example:**

```typescript
const taches = vgsdk.taches;
taches.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

### Checkpoints

**Endpoint:** `/checkpoints`

**Example:**

```typescript
const checkpoints = vgsdk.checkpoints;
checkpoints.getAll(new Metadatas()).then(response => {
  console.log(response);
});
```

## Export

The `VGSDK` class is exported as the default export.

```typescript
export default VGSDK;
```

---

Enjoy using the `VGSDK` class! If you have any questions or need further assistance, feel free to reach out.