import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExperienciaData } from '../components/experienciaData';
import { ApiComunicationService } from './api-comunication.service';
import { DataService } from './dataService';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaDataService extends DataService<ExperienciaData> {
  protected override endpointRoot: string=environment.endpoint_experiencias;
  constructor(protected override api:ApiComunicationService) { 
    super(api);
  }
}
