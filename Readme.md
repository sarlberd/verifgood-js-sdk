# Installation
```
npm install https://github.com/sarlberd/verifgood-js-sdk.git
```

# initialise

```ts
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";
import { getAccessTokenSilently } from "@auth0/auth0-react";

(async () => {
    let apiBaseUrl: string = "https://azeqsdfghrg.herokuapp.com/public/index.php";

    // Check if apiKey is already stored in localStorage
    let apiKey = localStorage.getItem("apiKey");

    if (!apiKey) {
        // Obtain the apiKey using Auth0's getAccessTokenSilently method
        apiKey = await getAccessTokenSilently();
        localStorage.setItem("apiKey", apiKey); // Store the apiKey in localStorage
    }

    let sdkConfig: SdkConfiguration = {
        apiBaseUrl: apiBaseUrl,
        apiKey: apiKey
    };

    let vgsdk: VGSDK = new VGSDK(sdkConfig);

    // Example API request
    vgsdk.categories.getAll(new Metadatas()).then((categories) => {
        console.log(categories);
    }).catch((error) => {
        console.error(error);
    });
})();
```

# SDK Initialization

The SDK should be instantiated only once in your application. You can achieve this by creating a singleton instance of the SDK and reusing it throughout your application. For example:

```ts
// sdkInstance.ts
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

let apiBaseUrl: string = "https://azeqsdfghrg.herokuapp.com/public/index.php";
let apiKey: string | null = localStorage.getItem("apiKey");

if (!apiKey) {
    throw new Error("API key is not available. Please authenticate first.");
}

let sdkConfig: SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};

export const vgsdk = new VGSDK(sdkConfig);
```

You can then import and use the `vgsdk` instance wherever needed in your application.

# Making API Requests

The SDK provides various services that you can use to interact with the Verifgood API. Here are some examples:

### Get All Categories
```ts
vgsdk.categories.getAll(new Metadatas()).then((categories) => {
    console.log(categories);
}).catch((error) => {
    console.error(error);
});
```

### Get the First 25 Taches with Specific Filter and Their Checkpoints
```ts
let metadatas = new Metadatas();
metadatas.setLimit(0, 25);
metadatas.setFilter("type_tache", "Verification_equipement", "equals");

vgsdk.taches.getAll(metadatas).then((taches) => {
    let checkpointsMetadatas = new Metadatas();
    let tachesIds = taches.datas.map((tache: { id: any; }) => tache.id);
    checkpointsMetadatas.setFilter("idTache_id", tachesIds, "equals");

    vgsdk.checkpoints.getAll(checkpointsMetadatas).then((checkpoints) => {
        taches.datas.forEach((tache: any) => {
            tache.checkpoints = checkpoints.datas.filter((checkpoint: { idTache_id: any; }) => checkpoint.idTache_id === tache.id);
        });
        console.log(taches);
    }).catch((error) => {
        console.error(error);
    });
}).catch((error) => {
    console.error(error);
});
```

# Documentation 

For more detailed documentation, refer to the following files:

https://sarlberd.github.io/verifgood-js-sdk/classes/VGSDK.VGSDK.html
