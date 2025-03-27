# Installation
```
npm install https://github.com/sarlberd/verifgood-js-sdk.git
```

# initialise

```ts
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

let apiBaseUrl: string = "https://azeqsdfghrg.herokuapp.com/public/index.php";
let apiKey: string = "your-api-key";

let sdkConfig: SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};

let vgsdk: VGSDK = new VGSDK(sdkConfig);
```

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
