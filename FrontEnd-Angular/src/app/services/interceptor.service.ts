import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
//Interceptor que coloca el token jwt en la cabecera para autenticar las operaciones en el backend
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthenticationService) { }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let currentToken=this.authService.tokenUsuario;
      //console.log(currentToken);
      if(typeof(currentToken)===typeof ("") ){
        req=req.clone({
          setHeaders:{
            Authorization:`Bearer ${currentToken}`
            
          }
        });
      }
      
      return next.handle(req);
  }
}
