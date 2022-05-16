import { Injectable } from '@angular/core';
import { ApiComunicationService } from './api-comunication.service';
import { SeccionData } from '../components/seccionData';
import { DataService } from './dataService';

@Injectable({
  providedIn: 'root'
})
export class SeccionDataService extends DataService<SeccionData> {

  protected override endpointRoot:string='/secciones'

  constructor(protected override api:ApiComunicationService) { 
    super(api);
  }

  traerSeccionPorNombre(nombre:string){
    return this.api.getUrl(this.endpointRoot+"?nombre="+nombre);
  }

}
