"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let apiBaseUrl = process.env.API_BASE_URL || "";
let apiKey = process.env.API_KEY || "";
let sdkConfig = {
    apiBaseUrl: apiBaseUrl,
    apiKey: apiKey
};
let vgsdk = new index_1.VGSDK(sdkConfig);
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
vgsdk.invitations.regenerateInvitationLink(20).then((invitation) => {
    console.log(invitation);
});
