import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

//Clase para el envio de errores
class ErrorAPI{
  status:number=0;
  mensaje:string=""
  constructor(status:number,mensaje:string){
    this.status=status;
    this.mensaje=mensaje;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiComunicationService {

  constructor(private http:HttpClient) { }

  private errorHandler(error:HttpErrorResponse){
    if(error.status===0){
      console.log("Error de conexion: No se ha podido establecer una comunicacion con el servidor.")
    }else if(error.status===401){//Si el error es deshautorizado (401) hay que llamar al servicio de autenticacion
      new AuthenticationService(this).forzarLogout(); //provoco un logout en el frontend (sin llamar al backend)
      console.error("Sus credenciales no son validas.");//Muestro un mensaje en la consola para verificar
    }else{
      console.error(`Ha ocurrido un error!!\nCodigo: ${error.status} \nError: ${error.error}`);
    }
    return throwError(()=>new ErrorAPI(error.status,error.message));

  }

  getUrl(endpoint:string):Observable<any>{
    return this.http.get<any>(environment.urlServicio+endpoint)
                    .pipe(catchError(this.errorHandler));
  }
  putUrl(endpoint:string,body:any):Observable<any>{
    return this.http.put(environment.urlServicio+endpoint,body)
                    .pipe(catchError(this.errorHandler));
  }
  postUrl(endpoint:string,body:any,header?:HttpHeaders):Observable<any>{
    return this.http.post(environment.urlServicio+endpoint,body,{'headers':header})
                    .pipe(catchError(this.errorHandler));
  }
  deleteUrl(endpoint:string):Observable<any>{
    return this.http.delete(environment.urlServicio+endpoint)
                    .pipe(catchError(this.errorHandler));
  }


}
