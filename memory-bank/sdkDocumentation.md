# VerifgoodSDK Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Core Concepts](#core-concepts)
5. [API Services](#api-services)
6. [Working with Metadata](#working-with-metadata)
7. [Error Handling](#error-handling)
8. [Advanced Usage](#advanced-usage)
9. [Examples](#examples)
10. [Troubleshooting](#troubleshooting)

## Introduction

VerifgoodSDK is a TypeScript/JavaScript SDK designed to simplify interaction with the Verifgood API. It provides a clean, type-safe interface for accessing various Verifgood services, handling authentication, managing requests, and processing responses.

### Key Features

- **Type Safety**: Built with TypeScript for compile-time error checking
- **Simplified API Access**: Easy-to-use interfaces for all Verifgood API endpoints
- **Authentication Management**: Automatic handling of API keys
- **Query Building**: Powerful metadata system for building complex queries
- **Error Handling**: Consistent error handling across all API requests

## Installation

### NPM Installation

```bash
npm install https://github.com/sarlberd/verifgood-js-sdk.git
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/sarlberd/verifgood-js-sdk.git
```

2. Install dependencies:
```bash
cd verifgood-js-sdk
npm install
```

3. Build the SDK:
```bash
npm run build
```

## Getting Started

### Basic Setup

To start using the SDK, you need to initialize it with your API credentials:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

// Configure the SDK with your API credentials
const sdkConfig: SdkConfiguration = {
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
};

// Initialize the SDK
const vgsdk = new VGSDK(sdkConfig);
```

### Making Your First API Request

Once the SDK is initialized, you can make API requests to various services:

```typescript
import { Metadatas } from "verifgood-js-sdk";

// Create a new Metadatas instance for query parameters
const metadatas = new Metadatas();

// Get all categories
vgsdk.categories.getAll(metadatas)
  .then(categories => {
    console.log("Categories:", categories);
  })
  .catch(error => {
    console.error("Error fetching categories:", error);
  });
```

## Core Concepts

### SDK Configuration

The SDK is configured using the `SdkConfiguration` interface:

```typescript
interface SdkConfiguration {
  apiBaseUrl: string;  // The base URL of the Verifgood API
  apiKey: string;      // Your API key for authentication
  storedResult?: boolean;  // Optional: Whether to store API results locally
  useStoredResultWhenOffline?: boolean;  // Optional: Whether to use stored results when offline
}
```

### Authentication

The SDK uses API key authentication. Your API key is automatically included in all requests as a Bearer token in the Authorization header.

```typescript
// Initialize with API key
const sdkConfig: SdkConfiguration = {
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
};

// Update API key if needed
vgsdk.auth.setApiKey("new-api-key");
```

### Services

The SDK provides access to various API services through properties on the VGSDK instance:

- `vgsdk.categories`: Access category-related operations
- `vgsdk.checkpoints`: Access checkpoint-related operations
- `vgsdk.equipements`: Access equipment-related operations
- `vgsdk.invitations`: Access invitation-related operations
- `vgsdk.lieux`: Access location-related operations
- `vgsdk.sharedLinks`: Access shared link-related operations
- `vgsdk.taches`: Access task-related operations

Each service provides methods for interacting with the corresponding API endpoints.

## API Services

### Categories Service

The Categories service provides access to category-related operations:

```typescript
// Get all categories
vgsdk.categories.getAll(metadatas)
  .then(categories => console.log(categories));

// Get a specific category by ID
vgsdk.categories.getById(123)
  .then(category => console.log(category));

// Create a new category
vgsdk.categories.create({ name: "New Category", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update a category
vgsdk.categories.update(123, { name: "Updated Category", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete a category
vgsdk.categories.remove(123)
  .then(result => console.log(result));
```

### Checkpoints Service

The Checkpoints service provides access to checkpoint-related operations:

```typescript
// Get all checkpoints
vgsdk.checkpoints.getAll(metadatas)
  .then(checkpoints => console.log(checkpoints));

// Get a specific checkpoint by ID
vgsdk.checkpoints.getById(123)
  .then(checkpoint => console.log(checkpoint));

// Create a new checkpoint
vgsdk.checkpoints.create({ name: "New Checkpoint", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update a checkpoint
vgsdk.checkpoints.update(123, { name: "Updated Checkpoint", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete a checkpoint
vgsdk.checkpoints.remove(123)
  .then(result => console.log(result));
```

### Equipements Service

The Equipements service provides access to equipment-related operations:

```typescript
// Get all equipment
vgsdk.equipements.getAll(metadatas)
  .then(equipements => console.log(equipements));

// Get specific equipment by ID
vgsdk.equipements.getById(123)
  .then(equipement => console.log(equipement));

// Create new equipment
vgsdk.equipements.create({ name: "New Equipment", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update equipment
vgsdk.equipements.update(123, { name: "Updated Equipment", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete equipment
vgsdk.equipements.remove(123)
  .then(result => console.log(result));
```

### Invitations Service

The Invitations service provides access to invitation-related operations:

```typescript
// Generate an invitation link
const invitationRequest = {
  email: "user@example.com",
  role: "ROLE_ADMIN"
};

vgsdk.invitations.generateInvitationLink(invitationRequest)
  .then(invitation => console.log(invitation));

// Check an invitation
const invitationToCheck = {
  email: "user@example.com",
  token: "invitation-token",
  origin: "http://localhost:8080"
};

vgsdk.invitations.checkInvitation(invitationToCheck)
  .then(validatedInvitation => console.log(validatedInvitation));

// Complete registration
const registrationData = {
  invitation_token: "invitation-token",
  password: "securePassword123",
  password_confirm: "securePassword123"
};

vgsdk.invitations.completeRegistration(registrationData)
  .then(result => console.log(result));
```

### Lieux Service

The Lieux service provides access to location-related operations:

```typescript
// Get all locations
vgsdk.lieux.getAll(metadatas)
  .then(lieux => console.log(lieux));

// Get a specific location by ID
vgsdk.lieux.getById(123)
  .then(lieu => console.log(lieu));

// Create a new location
vgsdk.lieux.create({ name: "New Location", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update a location
vgsdk.lieux.update(123, { name: "Updated Location", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete a location
vgsdk.lieux.remove(123)
  .then(result => console.log(result));
```

### SharedLinks Service

The SharedLinks service provides access to shared link-related operations:

```typescript
// Get all shared links
vgsdk.sharedLinks.getAll(metadatas)
  .then(sharedLinks => console.log(sharedLinks));

// Get a specific shared link by ID
vgsdk.sharedLinks.getById(123)
  .then(sharedLink => console.log(sharedLink));

// Create a new shared link
vgsdk.sharedLinks.create({ name: "New Shared Link", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update a shared link
vgsdk.sharedLinks.update(123, { name: "Updated Shared Link", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete a shared link
vgsdk.sharedLinks.remove(123)
  .then(result => console.log(result));
```

### Taches Service

The Taches service provides access to task-related operations:

```typescript
// Get all tasks
vgsdk.taches.getAll(metadatas)
  .then(taches => console.log(taches));

// Get a specific task by ID
vgsdk.taches.getById(123)
  .then(tache => console.log(tache));

// Create a new task
vgsdk.taches.create({ name: "New Task", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Update a task
vgsdk.taches.update(123, { name: "Updated Task", /* other relevant properties, see type definition for details */ ... })
  .then(result => console.log(result));

// Delete a task
vgsdk.taches.remove(123)
  .then(result => console.log(result));
```

## Working with Metadata

The Metadatas class is used to build query parameters for API requests. It provides methods for setting filters, limits, and other query parameters.

### Creating Metadata

```typescript
import { Metadatas } from "verifgood-js-sdk";

// Create a new Metadatas instance
const metadatas = new Metadatas();
```

### Setting Filters

```typescript
// Set a simple filter
metadatas.setFilter("type", "example", "equals");

// Set a filter with a different action
metadatas.setFilter("status", "active", "contains");

// Set multiple filters
metadatas.setFilter("type", "example", "equals")
         .setFilter("status", "active", "contains");

// Set filters from an array
const filters = [
  { attr: "type", colId: "type", value: "example", action: "equals" },
  { attr: "status", colId: "status", value: "active", action: "contains" }
];
metadatas.setFiltersFromArray(filters);
```

### Setting Limits

```typescript
// Set a limit with offset and count
metadatas.setLimit(0, 25);  // Get the first 25 items

// Set a limit for pagination
metadatas.setLimit(25, 25);  // Get items 26-50
```

### Setting Columns

```typescript
// Set columns for formatting data output
metadatas.setColumns({
  "id": "id",
  "name": "name",
  "description": null
});
```

### Checking Filters

```typescript
// Check if a filter exists
if (metadatas.filterExist("type")) {
  console.log("Type filter exists");
}

// Get a filter value
const typeValue = metadatas.getFilterValue("type");
console.log("Type value:", typeValue);

// Get a filter action
const typeAction = metadatas.getFilterAction("type");
console.log("Type action:", typeAction);
```

### Clearing Filters

```typescript
// Delete a specific filter
metadatas.deleteFilter("type");

// Clear all filters
metadatas.clearAllFilters();
```

### Getting Formatted Metadata

```typescript
// Get the formatted metadata for API requests
const formattedMetadata = metadatas.get();
console.log("Formatted metadata:", formattedMetadata);
```

## Error Handling

The SDK uses Promise-based error handling. Errors from API requests are propagated as Promise rejections.

```typescript
vgsdk.categories.getAll(metadatas)
  .then(categories => {
    console.log("Categories:", categories);
  })
  .catch(error => {
    console.error("Error fetching categories:", error);
    
    // Handle specific error cases
    if (error.message.includes("401")) {
      console.error("Authentication error. Check your API key.");
    } else if (error.message.includes("404")) {
      console.error("Resource not found.");
    } else {
      console.error("Unknown error:", error);
    }
  });
```

## Advanced Usage

### Async/Await

You can use async/await for cleaner code:

```typescript
async function fetchCategories() {
  try {
    const metadatas = new Metadatas();
    metadatas.setLimit(0, 25);
    
    const categories = await vgsdk.categories.getAll(metadatas);
    console.log("Categories:", categories);
    
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

fetchCategories();
```

### Chaining Requests

You can chain requests to perform complex operations:

```typescript
async function getTachesWithCheckpoints() {
  try {
    // Create metadata for taches query
    const tachesMetadatas = new Metadatas();
    tachesMetadatas.setLimit(0, 25);
    tachesMetadatas.setFilter("type_tache", "Verification_equipement", "equals");
    
    // Get taches
    const taches = await vgsdk.taches.getAll(tachesMetadatas);
    
    // Extract tache IDs
    const tacheIds = taches.datas.map(tache => tache.id);
    
    // Create metadata for checkpoints query
    const checkpointsMetadatas = new Metadatas();
    checkpointsMetadatas.setFilter("idTache_id", tacheIds, "equals");
    
    // Get checkpoints
    const checkpoints = await vgsdk.checkpoints.getAll(checkpointsMetadatas);
    
    // Combine taches with their checkpoints
    taches.datas.forEach(tache => {
      tache.checkpoints = checkpoints.datas.filter(checkpoint => 
        checkpoint.idTache_id === tache.id
      );
    });
    
    return taches;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

getTachesWithCheckpoints()
  .then(result => console.log("Taches with checkpoints:", result));
```

## Examples

### Example 1: Basic Category Retrieval

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Configure the SDK
const sdkConfig: SdkConfiguration = {
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
};

// Initialize the SDK
const vgsdk = new VGSDK(sdkConfig);

// Get all categories
vgsdk.categories.getAll(new Metadatas())
  .then(categories => {
    console.log("Categories:", categories);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

### Example 2: Filtered Query with Pagination

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Configure the SDK
const sdkConfig: SdkConfiguration = {
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
};

// Initialize the SDK
const vgsdk = new VGSDK(sdkConfig);

// Create metadata with filters and pagination
const metadatas = new Metadatas();
metadatas.setLimit(0, 10);  // First 10 items
metadatas.setFilter("tags", "mobilier", "equals");

// Get filtered categories
vgsdk.categories.getAll(metadatas)
  .then(categories => {
    console.log("Filtered categories:", categories);
    
    // Get next page
    metadatas.setLimit(10, 10);  // Next 10 items
    return vgsdk.categories.getAll(metadatas);
  })
  .then(nextPageCategories => {
    console.log("Next page categories:", nextPageCategories);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

### Example 3: Complete Invitation Flow

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationRequest, InvitationCard, InvitationCompleteRegistration } from "verifgood-js-sdk";

// Configure the SDK
const sdkConfig: SdkConfiguration = {
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
};

// Initialize the SDK
const vgsdk = new VGSDK(sdkConfig);

// Step 1: Generate an invitation link
const invitationRequest: InvitationRequest = {
  email: "user@example.com",
  role: "ROLE_ADMIN"
};

vgsdk.invitations.generateInvitationLink(invitationRequest)
  .then(invitation => {
    console.log("Invitation created:", invitation);
    
    // Step 2: Check the invitation
    const invitationToCheck: InvitationCard = {
      email: invitation.email,
      token: invitation.token,
      origin: "http://localhost:8080"
    };
    
    return vgsdk.invitations.checkInvitation(invitationToCheck);
  })
  .then(validatedInvitation => {
    console.log("Invitation is valid:", validatedInvitation);
    
    // Step 3: Complete registration
    const registrationData: InvitationCompleteRegistration = {
      invitation_token: validatedInvitation.token || "",
      password: "securePassword123",
      password_confirm: "securePassword123"
    };
    
    return vgsdk.invitations.completeRegistration(registrationData);
  })
  .then(registrationResult => {
    console.log("Registration completed:", registrationResult);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

## Troubleshooting

### Common Issues

#### Authentication Errors

If you're receiving 401 Unauthorized errors:

1. Check that your API key is correct
2. Ensure the API key is being properly set in the SDK configuration
3. Verify that your API key has the necessary permissions

```typescript
// Check your current API key
const currentApiKey = vgsdk.auth.getApiKey();
console.log("Current API key:", currentApiKey);

// Set a new API key if needed
vgsdk.auth.setApiKey("new-api-key");
```

#### Network Errors

If you're experiencing network errors:

1. Check your internet connection
2. Verify that the API base URL is correct
3. Ensure the API server is running and accessible

```typescript
// Log the API base URL
console.log("API base URL:", vgsdk.config.apiBaseUrl);
```

#### Incorrect Data Format

If you're receiving errors about incorrect data format:

1. Check the structure of the data you're sending
2. Ensure all required fields are included
3. Verify that the data types match the expected types

```typescript
// Log the data being sent
console.log("Data:", JSON.stringify(data, null, 2));
```

### Getting Help

If you're still experiencing issues:

1. Check the API documentation for specific endpoint requirements
2. Review the SDK source code for implementation details
3. Contact the Verifgood support team for assistance
