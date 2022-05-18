import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExperienciaData } from '../experienciaData';

@Component({
  selector: 'app-info-experiencia',
  templateUrl: './info-experiencia.component.html',
  styleUrls: ['./info-experiencia.component.css']
})
export class InfoExperienciaComponent implements OnInit {

  @Input() experiencia:ExperienciaData={
    id:NaN,
    puesto:"",
    tipoTrabajo:"",
    descripcion:"",
    nombreEmpresa:"",
    rutaLogoEmpresa:"",
    direccionEmpresa:"",
    fechaInicio:"",
    fechaFin:""
  };

  @Output() emisor:EventEmitter<ExperienciaData>=new EventEmitter<ExperienciaData>();

  constructor() { }

  ngOnInit(): void {
  }

  //Emite para decirle al editor que sera la tarjeta a editar
  activar(){
    this.emisor.emit(this.experiencia);
  }

  //Metodo para dar formato a la fecha mostrada en la tarjeta, solo se muestra el año
  getYear(fecha:String){
    return fecha.split("-")[0];
  }

}
