declare class Logger {
    static logRequest(endpoint: string, method: string, data: any): void;
    static logResponse(data: any): void;
    static logError(error: any): void;
}
export default Logger;
