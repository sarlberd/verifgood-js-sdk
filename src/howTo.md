# Obtaining an accessToken from Auth0
```js
import createAuth0Client from '@auth0/auth0-spa-js';

// Auth0 configuration
const auth0Config = {
  domain: 'YOUR_AUTH0_DOMAIN',
  client_id: 'YOUR_AUTH0_CLIENT_ID',
  redirect_uri: window.location.origin,
};

// Initialize Auth0 client
const auth0 = await createAuth0Client(auth0Config);

// Function to get access token silently
async function getAccessTokenSilently() {
  try {
    const token = await auth0.getTokenSilently();
    return token;
  } catch (error) {
    console.error('Error getting access token', error);
    return null;
  }
}

// Retrieve the access token
const accessToken = await getAccessTokenSilently();
```

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
