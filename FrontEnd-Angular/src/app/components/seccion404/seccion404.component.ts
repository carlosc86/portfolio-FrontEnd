import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { SeccionComponent } from '../seccion/seccion.component';
import { SeccionData } from '../seccionData';

@Component({
  selector: 'app-seccion404',
  templateUrl: './seccion404.component.html',
  styleUrls: ['./seccion404.component.css']
})
export class Seccion404Component extends SeccionComponent implements OnInit {

  constructor(private pdto:PortfolioDTOService, private router:Router) { 
    super();
  }

  override ngOnInit(): void {
    this.pdto.obtener<SeccionData>('secciones').subscribe(data=>{
      this.seccion=data.find(e=>e.nombre=='404')!;
    });
  }

  volver(){
    this.router.navigate(['']);
  }

}
