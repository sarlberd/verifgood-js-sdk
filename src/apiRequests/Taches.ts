import {ApiRequest} from "../core/ApiRequest";
import {Checkpoints} from "./Checkpoints";


export class Taches extends ApiRequest {
    endpoint: string = '/api/taches';
    endpointSingleton: string = '/api/tache';
    checkpointsApi: Checkpoints;
    constructor(auth: any, apiBaseUrl: string) {
        super(auth, apiBaseUrl);
        this.checkpointsApi = new Checkpoints(auth, apiBaseUrl);
    }
    /*getExcelFile(metadatas: Metadatas, filename: string = null, fileExtension: string = "xlsx"): Promise<void> {
        return new Promise((resolve, reject) => {
            var rc = this;
            var query = {
                userId: this.$app.appID,
                metadatas: metadatas.get()
            };
            let fileType = fileExtension != "csv" ? "excel" : "csv";
            let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
            let responseType = fileExtension != "csv" ? "blob" : "text";
            rc.setOptions({
                'responseType': responseType,
                'Content-Type': contentType
            });
            rc.get(`${this.endpoint}/export/${fileType}`, query, function (response) {
                let blob;
                if (fileExtension === "csv") {
                    const BOM = "\uFEFF";
                    blob = new Blob([BOM + response], { type: contentType });
                } else {
                    blob = new Blob([response], { type: contentType });
                }
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename + '_' + moment().format("DD-MM-YYYY") + '.' + fileExtension);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve();
            });
        });
    }*/
}
