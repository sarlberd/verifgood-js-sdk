# Basic request

```
npm install https://github.com/sarlberd/verifgood-js-sdk.git
```

```js
import { VGSDK, SdkConfiguration, Metadatas }  from "verifgood-js-sdk";
let apiBaseUrl : string = "endpoint";
let apiKey : string = "your-token";
let sdkConfig : SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk : VGSDK = new VGSDK(sdkConfig);

vgsdk.categories.getAll(new Metadatas()).then((categories) => {
    console.log(categories);
}).catch((error) => {
    console.error(error);
});
```

# Exemple avec filtrage
```js
import { VGSDK, SdkConfiguration, Metadatas }  from "verifgood-js-sdk";
let apiBaseUrl : string = "endpoint";
let apiKey : string = "your-token";
let sdkConfig : SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk : VGSDK = new VGSDK(sdkConfig);
let metadatas : Metadatas = new Metadatas();
metadatas.setLimit(0,10);
metadatas.setFilter("tags", "mobilier", "equals");
vgsdk.categories.getAll(metadatas).then((categories) => {
    console.log(categories);
}).catch((error) => {
    console.error(error);
});
```