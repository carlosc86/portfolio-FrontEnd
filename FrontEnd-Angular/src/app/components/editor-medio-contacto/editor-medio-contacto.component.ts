import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MedioContactoDataService } from 'src/app/services/medio-contacto-data.service';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { EditorData } from '../editorData';
import { MedioContactoData } from '../medioContactoData';

@Component({
  selector: 'app-editor-medio-contacto',
  templateUrl: './editor-medio-contacto.component.html',
  styleUrls: ['./editor-medio-contacto.component.css']
})
export class EditorMedioContactoComponent extends EditorData<MedioContactoData> implements OnInit {
  
  @Input() public override lista: MedioContactoData[]=[];
  @Output() actualizar:EventEmitter<MedioContactoData[]>=new EventEmitter<MedioContactoData[]>();

  constructor(private fb:FormBuilder, protected medioContactoService:MedioContactoDataService, private pdto:PortfolioDTOService) { 
    super(medioContactoService);
    //Expresion regular para manejar urls
    let RegExURL="^((((https?)://)|(mailto:))" +
                  "(%{2}|[-()_.!~*';/?:@&=+$, A-Za-z0-9])+)" + "([).!';/?:, ][[:blank:]])?$"
    this.forms=fb.group({
      url:['',[Validators.required,Validators.pattern(RegExURL)]],
      empresa:[''],
      urlLogo:['']
    });
  }

  override ngOnInit(): void {
    this.modal=document.getElementById('modalEditMedioContacto')!;
  }

  protected borrarElemento(): MedioContactoData {
    return {
      id:NaN,
      link:"",
      empresa:"",
      rutaIcono:""
    };
  }

  agregarMedio(){
    this.aceptar()
    this.actualizar.emit(this.lista);
  }

  borrarMedio(){
    this.eliminar();
    this.actualizar.emit(this.lista);
  }

  get link(){return this.forms.get('url');}
}
