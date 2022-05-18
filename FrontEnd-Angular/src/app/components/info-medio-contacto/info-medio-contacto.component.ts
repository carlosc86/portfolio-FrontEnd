import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedioContactoData } from '../medioContactoData';

@Component({
  selector: 'app-info-medio-contacto',
  templateUrl: './info-medio-contacto.component.html',
  styleUrls: ['./info-medio-contacto.component.css']
})
export class InfoMedioContactoComponent implements OnInit {

  @Input() medioContacto:MedioContactoData={
    id:NaN,
    link:"",
    empresa:"",
    rutaIcono:""
  }

  @Output() emisor:EventEmitter<MedioContactoData>=new EventEmitter<MedioContactoData>();

  constructor() { }

  ngOnInit(): void {
  }

  //Emite para decirle al editor que este medio de contacto se editara o eliminará
  buscarEditor(){
    this.emisor.emit(this.medioContacto);
  }

}
