import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { PaginaCargaComponent } from './components/pagina-carga/pagina-carga.component';
import { PaginaPortfolioComponent } from './components/pagina-portfolio/pagina-portfolio.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  
  {path:'',component:PaginaCargaComponent},
  {path:'portfolio',component:PaginaPortfolioComponent},  
  {path:'**',component:Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
