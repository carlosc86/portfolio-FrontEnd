import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { EstudioDataService } from 'src/app/services/estudio-data.service';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { EditorData } from '../editorData';
import { EstudioData } from '../estudioData';

@Component({
  selector: 'app-editor-estudio',
  templateUrl: './editor-estudio.component.html',
  styleUrls: ['./editor-estudio.component.css']
})
export class EditorEstudioComponent extends EditorData<EstudioData> implements OnInit{
  
  

  
  

  constructor(private fb:FormBuilder, private estudioService:EstudioDataService, private pdto:PortfolioDTOService) {
    super(estudioService);  
    this.modal=document.getElementById('editStudies')!;         
    this.forms=fb.group({
      titulo:['',[Validators.required]],
      nombreInstitucion:['',[Validators.required]],
      direccionInstitucion:[''],
      rutaLogo:[''],
      fechaInicio:['',[Validators.required]],
      fechaFin:['',[Validators.required]]
    });
   }
  override ngOnInit(): void {
    this.pdto.obtener<EstudioData>("estudios").subscribe(dato=>{//Carga de datos desde el portfolioDTO
      this.lista=dato
    });
    this.modal=document.getElementById('editStudies')!;//Necesario para cerral el modal con typescript
  }

  get titulo(){return this.forms.get('titulo')!;}
  get nombreInstitucion(){return this.forms.get('nombreInstitucion')!;}
  get fechaInicio(){return this.forms.get('fechaInicio')!;}
  get fechaFin(){return this.forms.get('fechaFin')!;}

  protected borrarElemento(){
    return {
      id:NaN,
      titulo:"",
      nombreInstitucion:"",
      direccionInstitucion:"",
      rutaLogoInstitucion:"",
      fechaInicio:"",
      fechaFin:""
    };
  }

  public validarFechas(){
    if(Date.parse(this.fechaFin.value)>Date.now()){
      this.forms.get('fechaFin')?.setErrors({'incorrect':true});
    }
    if(this.fechaInicio.value>this.fechaFin.value){
      this.forms.get('fechaInicio')?.setErrors({'incorrect':true});
    }
  }

}
