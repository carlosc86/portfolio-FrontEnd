import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HabilidadData } from '../habilidadData';

@Component({
  selector: 'app-info-habilidad',
  templateUrl: './info-habilidad.component.html',
  styleUrls: ['./info-habilidad.component.css']
})
export class InfoHabilidadComponent implements OnInit {

  @Input() habilidad:HabilidadData={
    id:-1,
    nombre:"",
    descripcion:"",
    porcentaje:-1
  }

  @Output() emisor:EventEmitter<HabilidadData>=new EventEmitter<HabilidadData>();

  constructor() { }

  ngOnInit(): void {
  }
  
  //Emite para decirle al editor que será la habilidad a editar o eliminar
  activar(){
    this.emisor.emit(this.habilidad);
  }

}
