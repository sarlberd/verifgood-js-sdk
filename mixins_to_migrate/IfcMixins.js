import {IFCDatasExtractor} from "src/services/IFC/IFCDatasExtractor.js";

export default {
    methods:{
        /**
        * @param file data example : event.target.files[0]
        */
        IfcMixins_readfile: function(url){
            return new Promise((resolve, reject)=>{
                var oReq = new XMLHttpRequest();
                oReq.responseType = "text";
                oReq.addEventListener('progress', (event) => {
                    this.loadingPercentage = Math.floor((event.loaded * 100) / event.total)
                })
                oReq.addEventListener("load", () => {
                    resolve(oReq.response);
                });
                oReq.open("GET", url);
                oReq.send();
            });
		},
        IfcMixins_getIFCDatasExtractor : function(ifcText){
            return new IFCDatasExtractor(ifcText);
        },
        IfcMixins_getIFCFile : function(ifcText){
            return new File([ifcText], "ifcFile");
        }
    }
}