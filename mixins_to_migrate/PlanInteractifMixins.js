export default {
    data:function(){
        return {

        }
    },
    methods:{
        /**
        * converti une donnée pièce ou équipement en feature
        * @param Object data {id: 1, libel_lieu: "Piece 1", ..., coordX: 0, coordY: 0}
        * @return Object feature
        */
        PlanInteractif_convertDataToFeature: function(data){
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data.coordX, data.coordY] // coordY = latlng.lng && coordX = latlng.lat
                },
                "properties": data,
                "id": null
            };
        },
        /**
        * modifie coordonnées d'une feature
        * @param Object feature
        * @param Object latlng {lat: ..., lng: ...}
        * @return feature updatée
        */
        PlanInteractif_updateFeaturePosition: function(feature, latlng){
            return {
                "type": "Feature",
                "geometry":{
                    "type": "Point",
                    "coordinates": [latlng.lng, latlng.lat]
                },
                "properties": Object.assign({}, feature.properties, {coordX: latlng.lat, coordY: latlng.lng}),
                "id": feature.id
            };
        },
        /**
        * @param Object geoJsonDraft
        * @return Array pièces à créer
        */
        PlanInteractif_getPiecesACreer: function(geoJsonDraft, etage){
            let markersSansIdentifiants = geoJsonDraft.features.filter((feature)=>feature.properties && (!feature.properties.hasOwnProperty("id") || !feature.properties.id));
            let piecesACreer = markersSansIdentifiants.map((marker)=>{
                return {
                    libel_lieu: marker.properties.libel_lieu,
                    type_lieu: "Piece",
                    idLieuParent_id: etage.id,
                    categorie: marker.properties.categorie,
                    codeUn: marker.properties.codeUn,
                    userId: this.$app.appID,
                    service: marker.properties.service
                };
            });
            return piecesACreer;
        },
        /**
        * @param Object geoJson
        * @param Array pieces
        * @return Object geoJson associé avec les pièces correpondantes
        */
        PlanInteractif_reaffectePiecesAuxMarkers: function(pieces, geoJson){
            let geoJsonModified = Object.assign({}, {}, geoJson);
            let currentPiece = null;
            geoJsonModified.features.forEach((marker, index)=>{
                currentPiece = pieces.find((piece)=>piece.libel_lieu == marker.properties.libel_lieu && piece.codeUn==marker.properties.codeUn);
                if(currentPiece) geoJsonModified.features[index].properties = currentPiece;
            });
            return geoJsonModified;
        },
        /**
        * récupère les pièces|équipements positionné(e)s et non positionné(e)s
        * @param Array collection pièces|équipements
        * @param Object geoJson
        * @return Array [Array, Array] positionnes et nonPositionnes
        */
        PlanInteractif_getElementsPositionneesEtNonPositionnees: function(collection, geoJson){
            console.log("PlanInteractif_getElementsPositionneesEtNonPositionnees", collection, geoJson)
            let positionnes = [];
            let nonPositionnes = [];
            let idsGeoJson = geoJson.features.map((marker)=>marker.properties.id);
            collection.forEach((item)=>{
                if(idsGeoJson.indexOf(item.id)!=-1) positionnes.push(item);
                else nonPositionnes.push(item);
            });
            return [positionnes, nonPositionnes];
        },
        /**
        * @params Object datas equipement|piece
        * @params Object latlng {lat:10, lng: 10}
        */
        PlanInteractif_newGeoJsonFeature: function(datas, latlng){
            return {
                "type": "Feature",
                "geometry":{
                    "type": "Point",
                    "coordinates": [latlng.lng, latlng.lat]
                },
                "properties": Object.assign({}, datas, {coordX: latlng.lat, coordY: latlng.lng}),
                "id": datas.uid
            };
        },
        /**
        * Renvoie une copie du geoJson (ie pas de shallow copy dont les sous sous objets pointent sur les mêmes référence)
        * @param Object geoJson
        * @return Object copy of geoJson
        */
        PlanInteractif_geoJsonDeepCopy: function(geoJson){
            let copyOfGeoJson = { type: "FeatureCollection", features: [] };
            copyOfGeoJson.features = [...geoJson.features];
            return copyOfGeoJson;
        },
        /**
        * @param geoJson geoJson
        * @param Object etage
        */
        PlanInteractif_exportPiecesACreerExcel: function(geoJson, etage, fileName="Verifgood_pieces_a_creer_"){
            let markers = geoJson.features;
            let piecesACreer = [];
            let path = etage.path.split("/");
            markers.forEach((marker)=>{
                if(!marker.properties.hasOwnProperty("id")){
                    piecesACreer.push(
                        [
                            marker.properties.libel_lieu,
                            marker.properties.codeUn,
                            marker.properties.categorie.libelleCatgorie,
                            marker.properties.service,
                            path[1],
                            path[2],
                            path[3]
                        ]
                    );
                }
            });
            this.PlanInteractif_exportExcel(piecesACreer, ["Pièce", "QRCODE", "Catégorie", "Service", "Site", "Batiment", "Etage"], fileName);
        },
        PlanInteractif_exportExcel: function(datas, header=null, fileName){
            let datasFile = [...datas];
            if(header) datasFile.unshift(header);
            datasFile = datasFile.map((d)=>d.join(",")).join("\n");
            const url = window.URL.createObjectURL(new Blob([datasFile]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName+moment().format("DD-MM-YYYY")+'.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        /**
         * convert a csv file to array of objects
         * @param {*} inputFile 
         * @return array of objects
         */
        PlanInteractif_importCsv(inputFile){
            return new Promise((resolve, reject)=>{
                let reader = new FileReader();
                reader.onload = (e)=>{
                    let lines = e.target.result.split("\n");
                    let headers = lines[0].split(",");
                    // remove spaces, slashes, quotes, special characters from headers
                    headers = headers.map((header)=>header.replace(/[\s\/"']/g, ""));
                    let datas = [];
                    for(let i=1; i<lines.length; i++){
                        let line = lines[i].split(",");
                        // foreach line element sanitize each cells no spaces, no slashes, no quotes, no special characters
                        line = line.map((cell)=>cell.replace(/[\s\/"']/g, "")); 
                        let data = {};
                        for(let j=0; j<headers.length; j++){
                            data[headers[j]] = line[j];
                        }
                        datas.push(data);
                    }
                    // foreach datas cast coordX and coordY to int
                    datas = datas.map((data)=>{
                        data.coordX = parseInt(data.coordX);
                        data.coordY = parseInt(data.coordY);
                        return data;
                    });
                    resolve(datas);
                };
                reader.onerror = (e)=>{
                    reject(e);
                };
                reader.readAsText(inputFile);
            });
        }
    },
    computed: {
        PlanInteractif_geoJsonVide: function(){
            return {
                type: "FeatureCollection",
                features: []
            };
        }
    }
}
