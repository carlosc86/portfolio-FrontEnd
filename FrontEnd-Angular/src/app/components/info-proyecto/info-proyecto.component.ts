import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProyectoData } from '../proyectoData';

@Component({
  selector: 'app-info-proyecto',
  templateUrl: './info-proyecto.component.html',
  styleUrls: ['./info-proyecto.component.css']
})
export class InfoProyectoComponent implements OnInit {

  @Input() proyecto:ProyectoData={
    id:NaN,
    nombre:"",
    descripcion:"",
    link:"",
    fecha:"",
    rutasImagenes:[""]
  }

  @Output() emisor:EventEmitter<ProyectoData>=new EventEmitter<ProyectoData>();

  constructor() { }

  ngOnInit(): void {
  }

  //Emite para decirle al editor que será el componente a editar o eliminar
  activar(){
    this.emisor.emit(this.proyecto);
  }

  //Da formato a la fecha mostrada, solo se visualiza el año
  getYear(fecha:String){
    return fecha.split("-")[0];
  }
}
