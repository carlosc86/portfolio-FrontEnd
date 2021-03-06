import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MensajeDataService } from 'src/app/services/mensaje-data.service';
import { MensajeData } from '../mensajeData';

@Component({
  selector: 'app-form-envio-mensaje',
  templateUrl: './form-envio-mensaje.component.html',
  styleUrls: ['./form-envio-mensaje.component.css']
})
export class FormEnvioMensajeComponent implements OnInit {

  correo:MensajeData={
    id:NaN,
    nombreAutor:"",
    apellidoAutor:"",
    emailAutor:"",
    titulo:"",
    cuerpo:"",
    fecha:"",
    leido:false
  };

  formulario:FormGroup;

  constructor(private fb:FormBuilder, protected mensajeService:MensajeDataService) { 
  
    let soloLetras="[A-Za-z ]*"; //Expresion regular para validar solo letras
    //Creo el formulario
    this.formulario=fb.group({
      nombre:['', [Validators.required,Validators.minLength(2),Validators.pattern(soloLetras)]],
      apellido:['', [Validators.required,Validators.minLength(2),Validators.pattern(soloLetras)]],
      email:['', [Validators.required, Validators.email]],
      asunto:['',  [Validators.required,Validators.minLength(5)]],
      mensaje:['',[Validators.required,Validators.minLength(15)]]
    });
  }

  ngOnInit(): void {

  }

  //Metodos para mejorar la lectura de la plantilla
  get nombre(){ return this.formulario.get('nombre')!;}
  get apellido(){ return this.formulario.get('apellido')!;}
  get email(){ return this.formulario.get('email')!;}
  get asunto(){ return this.formulario.get('asunto')!;}
  get mensaje(){ return this.formulario.get('mensaje')!;}

  //Metodo aceptar donde se colocan otros datos necesarios para el manejo de mensajes
  aceptar(){
    this.formulario.markAllAsTouched();
    if(this.formulario.valid){
      this.correo.fecha=moment(Date.now()).format("YYYY-MM-DD");
      this.mensajeService.agregar(this.correo).subscribe(data=>{
        this.formulario.reset();
      })
      
    }
    
  }

}
