import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { ProyectoDataService } from 'src/app/services/proyecto-data.service';
import { EditorData } from '../editorData';
import { ProyectoData } from '../proyectoData';

@Component({
  selector: 'app-editor-proyecto',
  templateUrl: './editor-proyecto.component.html',
  styleUrls: ['./editor-proyecto.component.css']
})
export class EditorProyectoComponent extends EditorData<ProyectoData> implements OnInit {
 
  listaRutas:string[]=[];
    
  constructor(private fb:FormBuilder, private proyectoService:ProyectoDataService, private pdto:PortfolioDTOService) {
    super(proyectoService);

    //Expresiones regulares utilizadas para validar datos
    let RegExURL="^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))" +
                  "(%{2}|[-()_.!~*';/?:@&=+$, A-Za-z0-9])+)" + "([).!';/?:, ][[:blank:]])?$";
    let RegExImg="^(([./#?=&:]*)([a-zA-Z0-9])*)*(.png|.jpg|.jpeg|.gif|.svg)$";

    //Creacion del formulario
    this.forms=fb.group({
      nombre:['',[Validators.required]],
      descripcion:[''],
      link:['',[Validators.required,Validators.pattern(RegExURL)]],
      fecha:['',[Validators.required]],
      urlImagen:['',[Validators.pattern(RegExImg)]] //CUIDADO ACA SE DEBE INGRESAR UN ARRAY
    });
   }

   override ngOnInit(): void {
    this.pdto.obtener<ProyectoData>("proyectos").subscribe(dato=>{
      this.lista=dato
    });
    this.modal=document.getElementById('editProjects')!;
  }

  //Establece que elemento es el que se va a modificar o crear si no hay ninguno
  override setActivo(dato: ProyectoData): void {
    super.setActivo(dato);
    this.listaRutas=dato.rutasImagenes;
  }

  //Reset del formulario
  override resetForm(): void {
    super.resetForm();
    this.listaRutas=[];
  }

  //Se limpia la variable utilizada para la creacion o modificacion de elementos
  protected borrarElemento(): ProyectoData {
    return {
        id:NaN,
        nombre:"",
        descripcion:"",
        link:"",
        fecha:"",
        rutasImagenes:[""]
      }
  }
 
  //Metodos Get para simplificar la lectura de la plantilla
  get nombre(){return this.forms.get('nombre')!;}
  get link(){return this.forms.get('link')!;}
  get fecha(){return this.forms.get('fecha')!;}
  get urlImagen(){return this.forms.get('urlImagen')!;}

  //Agrega una url de una imagen a la lista de imagenes
  agregarALista(){
    if(this.urlImagen.valid){
      this.listaRutas.push(this.urlImagen.value);
      this.forms.get('urlImagen')?.reset();
    }
  }

  //Quita una url de la lista de imagenes
  quitarDeLista(ruta:string){
    let indice=this.listaRutas.indexOf(ruta);
    this.listaRutas.splice(indice,1);
  }

  confirmarCambios(){
    this.elemento.rutasImagenes=this.listaRutas;
    this.aceptar();
  }

  validarFecha(){
    if(Date.parse(this.fecha.value)>Date.now()){
      this.fecha.setErrors({'incorrect':true});
    }
  }
}
