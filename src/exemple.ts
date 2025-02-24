import { VGSDK, SdkConfiguration, Metadatas }  from "./index";
import dotenv from 'dotenv';

dotenv.config();

let apiBaseUrl : string = process.env.API_BASE_URL || "";
let apiKey : string = process.env.API_KEY || "";

let sdkConfig : SdkConfiguration = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk : VGSDK = new VGSDK(sdkConfig);

/**
 * Get all categories
 */
/*vgsdk.categories.getAll(new Metadatas()).then((categories) => {
    console.log(categories);
}).catch((error) => {
    console.error(error);
});*/

/**
 * Get the 25 first taches with type_tache = "Verification_equipement" and their checkpoints
 */
let metadatas = new Metadatas();
metadatas.setLimit(0,25);
metadatas.setFilter("type_tache", "Verification_equipement", "equals");
vgsdk.taches.getAll(metadatas).then((taches) => {
    //console.log(taches);

    let checkpointsMetadatas = new Metadatas();
    let tachesIds = taches.datas.map((tache: { id: any; }) => tache.id);
    checkpointsMetadatas.setFilter("idTache_id", tachesIds, "equals");
    vgsdk.checkpoints.getAll(checkpointsMetadatas).then((checkpoints) => {
        // mix tache and checkpoint the commun field is tache.id = checkpoint.idTache_id
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



