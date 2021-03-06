import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MensajeDataService } from 'src/app/services/mensaje-data.service';
import { MensajeData } from '../mensajeData';

@Component({
  selector: 'app-form-lectura-mensaje',
  templateUrl: './form-lectura-mensaje.component.html',
  styleUrls: ['./form-lectura-mensaje.component.css']
})
export class FormLecturaMensajeComponent implements OnInit {

  mensajes:MensajeData[]=[];
  mensajeActivo:MensajeData={
    id:NaN,
    nombreAutor:"",
    apellidoAutor:"",
    emailAutor:"",
    titulo:"",
    cuerpo:"",
    fecha:"",
    leido:false
  };

  constructor(private mensajeService:MensajeDataService) {

   }

  ngOnInit(): void {
    moment.locale('es');
    this.mensajeService.traer().subscribe(dato=>{
      this.mensajes=dato;
      this.mensajes.sort((e,f)=>moment(f.fecha).unix()-moment(e.fecha).unix());//formateo la fecha del mensaje
    });
  }

  darFormatoFecha(fecha:string,completa:boolean){
    if(fecha.length>0){
      if(completa)
        return moment(fecha,"YYYY-MM-DD").format("DD-MM-YYYY");
      else 
        return moment(fecha,"YYYY-MM-DD").format("DD-MM-YY");
    }else return "";
  }

  //carga el mensaje en el tablero de mensajes
  leerMensaje(id:number){
    this.mensajeActivo=this.mensajes.find(e => e.id===id)!;
    if(this.mensajeActivo!=null && !(this.mensajeActivo.leido)){
      this.mensajeActivo.leido=true;
      this.mensajeService.modificar(this.mensajeActivo).subscribe(dato=>{
      });
    }    
  }

  //Carga el siguiente mensaje de la lista en el tablero de mensajes
  siguienteMensaje(){
    let indice=this.mensajes.indexOf(this.mensajeActivo);
    if(indice+1<this.mensajes.length){
      this.mensajeActivo=this.mensajes[indice+1];
      this.leerMensaje(this.mensajeActivo.id);
    }
  }

  //Carga el mensaje anterior de la lista de mensajes en el tablero
  anteriorMensaje(){
    let indice=this.mensajes.indexOf(this.mensajeActivo);
    if(indice-1>=0){
      this.mensajeActivo=this.mensajes[indice-1];
      this.leerMensaje(this.mensajeActivo.id);
    }

  }

}
