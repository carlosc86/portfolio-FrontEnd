import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PortfolioDTO } from '../components/portfolioDTO';
import { ApiComunicationService } from './api-comunication.service';
import { DataService } from './dataService';

type claves=keyof Omit<PortfolioDTO,'id'>;
type tipos= PortfolioDTO[claves];

interface obsevador{ //interfaz de soporte para vincular claves con subjects
  nombre:claves,
  valor:Subject<any>
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDTOService extends DataService<PortfolioDTO> {
  
  protected override endpointRoot: string=environment.endpoint_portfolio;

  protected observadores$:obsevador[]=[]; //Generadores de observables para los distintos datos.

  private dtoCache:PortfolioDTO; //Especie de cache improvisada, solo para cargar los datos por primera vez

  private enEspera:boolean=true; //Flag para establecer que el servicio esta a la espera de datos del backend

  constructor(protected override api:ApiComunicationService) {
    super(api);

    this.dtoCache={
      id:NaN,
      secciones:[],
      medios_contacto:[],
      estudios:[],
      habilidades:[],
      experiencias:[],
      proyectos:[]
    }
    this.cargarObservadores();//Creo los observadores, pues todavia no hay ninguno
    this.traer().subscribe(dato=>{
      this.dtoCache=dato[0];
      this.enEspera=false;
      this.cargarObservadores();//Actualizo los observadores, lo que provoca callbacks
    });
  }

  override traer(ruta?: string): Observable<PortfolioDTO[]> {
    this.enEspera=true;
    return super.traer();
  }

  //Trae algun dato de los cargados en la variables
  obtener<T>(llave:claves):Observable<T[]>{ //Devuelve la promesa de un elemento dentro del DTO
    let elemento=this.buscarObservador<T>(llave);
    if(!this.enEspera&&this.dtoCache.secciones.length>0){
      this.enEspera=true;
      setTimeout(()=>{
        this.cargarObservadores();//Actualizo los observadores, lo que provoca callbacks
      },50);      
    }
    return elemento.valor.asObservable();
  }

  //Busco dentro de mi lista de observadores el adecuado para el tipo de datos pedido
  private buscarObservador<T>(llave:claves):obsevador{
    let elemento=this.observadores$.find(e=>e.nombre===llave);
    if(elemento===undefined){ //si no lo encuentro lo creo y lo agrego a la lista
      elemento={nombre:llave,valor:new Subject<T[]>()};
      this.observadores$.push(elemento);
    }
    return elemento;
  }

  //Metodo para actualizar los observadores con los datos de dtoCache
  private cargarObservadores(){
    for(let llave in this.dtoCache){
      if(llave!=='id'){
        let obs=this.buscarObservador<typeof this.dtoCache[claves]>(llave as claves);
        obs.valor.next(this.dtoCache[llave as claves]);
      }
        
    }
    this.enEspera=false;
  }

}

