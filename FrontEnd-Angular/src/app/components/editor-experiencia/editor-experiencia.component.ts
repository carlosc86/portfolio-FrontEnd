import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExperienciaDataService } from 'src/app/services/experiencia-data.service';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { EditorData } from '../editorData';
import { ExperienciaData } from '../experienciaData';

@Component({
  selector: 'app-editor-experiencia',
  templateUrl: './editor-experiencia.component.html',
  styleUrls: ['./editor-experiencia.component.css']
})
export class EditorExperienciaComponent extends EditorData<ExperienciaData> implements OnInit {
  
  constructor(private fb:FormBuilder, private experienciaService:ExperienciaDataService, private pdto:PortfolioDTOService) { 
    super(experienciaService);
    this.forms=fb.group({
      puesto:['',[Validators.required]],
      tipoTrabajo:['',[Validators.required]],
      descripcion:[''],
      nombreEmpresa:['',[Validators.required]],
      direccionEmpresa:[''],
      urlLogoEmpresa:[''],
      fechaInicio:['',[Validators.required]],
      fechaFin:['',[Validators.required]]
    });
  }
  override ngOnInit(): void {
    this.pdto.obtener<ExperienciaData>("experiencias").subscribe(dato=>{//Carga de datos desde el portfolioDTO
      this.lista=dato
    });
    this.modal=document.getElementById('editExperiences')!; //Necesario para cerral el modal con typescript
  }

  protected borrarElemento(): ExperienciaData {
    return {
      id:NaN,
      puesto:"",
      tipoTrabajo:"",
      descripcion:"",
      nombreEmpresa:"",
      direccionEmpresa:"",
      rutaLogoEmpresa:"",
      fechaInicio:"",
      fechaFin:""
    };
  }

  get puesto(){return this.forms.get('puesto')!;}
  get tipoTrabajo(){return this.forms.get('tipoTrabajo')!;}
  get nombreEmpresa(){return this.forms.get('nombreEmpresa')!;}
  get fechaInicio(){return this.forms.get('fechaInicio')!;}
  get fechaFin(){return this.forms.get('fechaFin')!;}

  public validarFechas(){
    if(Date.parse(this.fechaFin.value)>Date.now()){
      this.fechaFin.setErrors({'incorrect':true});
    }
    if(this.fechaInicio.value>this.fechaFin.value){
      this.fechaInicio.setErrors({'incorrect':true});
    }
  }

}
