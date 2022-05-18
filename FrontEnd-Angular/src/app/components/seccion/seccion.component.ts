import { Component, OnInit,Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SeccionData } from '../seccionData';


@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
//Seccion generica usada como clase padre para las demas secciones
export class SeccionComponent implements OnInit {

  @Input() seccion:SeccionData={
    id:NaN,
    nombre:"",
    titulo:"",
    texto:"",
    rutaImagen:"",
    colorFondo:"",
    colorTexto:""
  };

  @Output() activar:EventEmitter<SeccionData>=new EventEmitter<SeccionData>();

  constructor() {
    
   }

  ngOnInit(): void {
  }
  
  //Emite para decirle al editor que será la seccion a modificar
  llamarEditor(){
    this.activar.emit(this.seccion);
  }

}
