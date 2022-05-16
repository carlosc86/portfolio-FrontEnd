import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { PaginaCargaComponent } from './components/pagina-carga/pagina-carga.component';
import { PaginaPortfolioComponent } from './components/pagina-portfolio/pagina-portfolio.component';
import { Seccion404Component } from './components/seccion404/seccion404.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  
  {path:'',component:PaginaCargaComponent},
  {path:'portfolio',component:PaginaPortfolioComponent},  
  {path:'**',component:Seccion404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
