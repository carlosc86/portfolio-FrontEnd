import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SeccionDataService } from 'src/app/services/seccion-data.service';
import { MensajeData, mensajes } from '../mensajeData';
import { SeccionComponent } from '../seccion/seccion.component';

@Component({
  selector: 'app-seccion-contacto',
  templateUrl: './seccion-contacto.component.html',
  styleUrls: ['./seccion-contacto.component.css']
})
export class SeccionContactoComponent extends SeccionComponent implements OnInit {

  mensajes:MensajeData[]=mensajes;

  constructor(private seccionS:SeccionDataService) { 
    super();
  }

  override ngOnInit(): void {
    this.seccionS.traerSeccionPorNombre('Contacto').subscribe(dato=>{
      this.seccion=dato[0];
    });
  }

  guardarMensaje($event:MensajeData){
    $event.id=this.mensajes.length;
    this.mensajes.push($event);
    this.mensajes.sort((e,f)=>moment(f.fecha).unix()-moment(e.fecha).unix());
    alert("Mensaje enviado con exito.");//Enviado con el servicio de mensajes
    console.log(this.mensajes[this.mensajes.length-1]);
  }

}
