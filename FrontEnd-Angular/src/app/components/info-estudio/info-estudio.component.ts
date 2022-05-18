import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstudioData } from '../estudioData';

@Component({
  selector: 'app-info-estudio',
  templateUrl: './info-estudio.component.html',
  styleUrls: ['./info-estudio.component.css']
})
export class InfoEstudioComponent implements OnInit {

  @Input() estudio:EstudioData={
    id:0,
    titulo:"",
    nombreInstitucion:"",
    direccionInstitucion:"",
    rutaLogoInstitucion:"",
    fechaInicio:"",
    fechaFin:""
  };

  @Output() emisor:EventEmitter<EstudioData>=new EventEmitter<EstudioData>();

  constructor() { }

  ngOnInit(): void {
  }

  //Emite para decirle al editor que sera la tarjeta a editar
  activar(){
    this.emisor.emit(this.estudio);
  }

  //Metodo para dar formato a la fecha mostrada, solo se muestra el año
  getYear(fecha:String){
    return fecha.split("-")[0];
  }

}
