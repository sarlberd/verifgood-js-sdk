"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let apiBaseUrl = process.env.API_BASE_URL_TEST || "";
let apiKey = process.env.API_KEY || "";
let sdkConfig = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk = new index_1.VGSDK(sdkConfig);
let metadatas = new index_1.Metadatas();
metadatas.setLimit(0, 25);
vgsdk.equipements.getByCode("SAPH-EQ-000070").then((equipements) => {
    console.log(equipements);
}).catch((error) => {
    console.log("error_____________");
    console.error(error.status);
});
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
/*
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
*/
/*vgsdk.equipements.getByCode("fbhrj437737737345555").then((equipement) => {
    console.log(equipement);
    
}).catch((error) => {
    console.error(error);
});*/
/*vgsdk.invitations.regenerateInvitationLink(20).then((invitation) => {
    console.log(invitation);
});*/
/*const deviceToken = "coqnU0ZBZR1W4fTi1oD15A:APA91bH-MVu169pX20eQmM5iPChfOCGe79dCjqFAtTIl0FdTSeI1UxiBR05elo7d7Vj-aOlSJVKoqujaVzcYipL9_e73frqWnl6ip61230yND58BVGe6P40";
vgsdk.messaging.subscribeToTopic("debug", deviceToken).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});

vgsdk.messaging.sendMessageToTopic("debug", { message: "Hello World" }).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});

/*vgsdk.messaging.unsubscribeFromTopic("debug", deviceToken).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});*/
/*vgsdk.messaging.sendMessageToDevice(deviceToken, { message: "Hello World" }).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});*/
//# sourceMappingURL=exemple.js.map