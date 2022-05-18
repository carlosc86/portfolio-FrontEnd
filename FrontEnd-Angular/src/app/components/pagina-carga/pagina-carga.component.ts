import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioDTOService } from 'src/app/services/portfolio-dto.service';
import { PortfolioDTO } from '../portfolioDTO';

@Component({
  selector: 'app-pagina-carga',
  templateUrl: './pagina-carga.component.html',
  styleUrls: ['./pagina-carga.component.css']
})
export class PaginaCargaComponent implements OnInit {

  private primeraCarga=true;//flag para no cargar cada vez que se vuelva a esta pagina

  constructor(private router:Router ,private portfolioService:PortfolioDTOService) { }

  ngOnInit(): void {
    if(this.primeraCarga){
      this.portfolioService.obtener<PortfolioDTO>('secciones').subscribe(dato=>{
        this.primeraCarga=false;
        this.router.navigate(['portfolio']);
      });
    }
  }

}
