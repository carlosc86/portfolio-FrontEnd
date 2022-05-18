import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CredencialData } from '../components/credencialData';
import { UsuarioData } from '../components/usuarioData';
import { ApiComunicationService } from './api-comunication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //Observables de cambios en las variables de sesion una para el jwt, otra para el usuario
  currentTokenSubject:BehaviorSubject<any>;
  currentUserSubject:BehaviorSubject<UsuarioData>;
  
  //Datos obtenidos de las variables de entorno
  private endpointRoot=environment.endpoint_autorizacion;
  private tokenKey=environment.sessionTokenName;
  private userKey=environment.sessionUserName;

  constructor(private api:ApiComunicationService) { 
    this.currentTokenSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(this.tokenKey)||'{}'));
    this.currentUserSubject=new BehaviorSubject<UsuarioData>(JSON.parse(sessionStorage.getItem(this.userKey)||'{}'));
  }

  login(credenciales:CredencialData):Observable<any>{
    let header=new HttpHeaders().set("Authorization","basic "+btoa(credenciales.user+":"+credenciales.password));
    return this.api.postUrl(this.endpointRoot,"",header).pipe(map(data=>{
      sessionStorage.setItem(this.tokenKey,JSON.stringify(data.token));//guardo el token en el sessionStorage.
      sessionStorage.setItem(this.userKey,JSON.stringify(data.usuario));//guardo datos del usuario
      //Actualizo los observables
      this.currentTokenSubject.next(JSON.parse(sessionStorage.getItem(this.tokenKey)!));
      this.currentUserSubject.next(JSON.parse(sessionStorage.getItem(this.userKey)!));
      return data;
    }));
  }

  logout():Observable<any>{
    //Borro los datos de sesion en el storage
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    //Llamo al backend para informar el logout
    return this.api.postUrl(this.endpointRoot+"/logout",this.currentUserSubject.value).pipe(map(data=>{
      //Actualizo los observables
      this.currentTokenSubject.next(JSON.parse('{}'));//no hay nada lo acabo de borrar
      this.currentUserSubject.next(JSON.parse('{}'));//no hay nada lo acabo de borrar
      return data;
    }));
  } 

  //Metodo utilizado para saber si hay un usuario logueado
  isLogin():boolean{
    return sessionStorage.getItem(this.tokenKey)? true:false; //Por ahora si no hay token no estas logueado, sin tener en cuenta la expiracion.
  }


  get tokenUsuario(){
    return this.currentTokenSubject.value;
  }

  get usuario(){
    return this.currentUserSubject.asObservable();
  }

  //Metodo solo utilizado cuando hay error de authenticacion con el backend, se debe reloguear
  forzarLogout(){ 
    //Desloguea al usuario sin necesidad de informar al backend, pues este ya ha dado el error
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.currentTokenSubject.next(JSON.parse('{}'));//no hay nada lo acabo de borrar
    this.currentUserSubject.next(JSON.parse('{}'));//no hay nada lo acabo de borrar
  }
}
