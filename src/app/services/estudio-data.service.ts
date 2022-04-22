import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiComunicationService } from './api-comunication.service';
import { DataService } from './dataService';

@Injectable({
  providedIn: 'root'
})
export class EstudioDataService extends DataService {

  protected override endpointRoot:string=environment.endpoint_estudios; //El unico drama en esta historia

  constructor(protected override api:ApiComunicationService) {
    super(api);
   }
}
