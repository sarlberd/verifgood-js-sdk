class Logger {
    static logRequest(endpoint:string, method: string, data: any) {
      console.log(`[Request] ${method} ${endpoint}`, data);
    }
  
    static logResponse(data:any) {
      console.log(`[Response]`, data);
    }
  
    static logError(error:any) {
      console.error(`[Error]`, error);
    }
  }
  
  export default Logger;
  