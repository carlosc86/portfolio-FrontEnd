import { Component,  OnInit,  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HabilidadDataService } from 'src/app/services/habilidad-data.service';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { EditorData } from '../editorData';
import { HabilidadData } from '../habilidadData';

@Component({
  selector: 'app-editor-habilidad',
  templateUrl: './editor-habilidad.component.html',
  styleUrls: ['./editor-habilidad.component.css']
})
export class EditorHabilidadComponent extends EditorData<HabilidadData> implements OnInit {
  
  constructor(private fb:FormBuilder,
              private habilidadService:HabilidadDataService, private pdto:PortfolioDTOService) {
    super(habilidadService);
    this.forms=fb.group({
      nombre:['',[Validators.required]],
      descripcion:[''],
      porcentaje:[50,[Validators.required,Validators.min(0),Validators.max(100)]]
    });
   }
   override ngOnInit(): void {
    this.pdto.obtener<HabilidadData>("habilidades").subscribe(dato=>{// Cargo los datos desde el portfolioDTO
      this.lista=dato
    });
    this.modal=document.getElementById('editSkills')!;//Necesario para cerrar el modal desde typescript.
  }

   protected borrarElemento(): HabilidadData {
    return {
      id:NaN,
      nombre:"",
      descripcion:"",
      porcentaje:50
    };
  }

  get nombre(){return this.forms.get('nombre')!;}
  get porcentaje(){return this.forms.get('porcentaje')!;}
  get descripcion(){return this.forms.get('descripcion')!;}

}
