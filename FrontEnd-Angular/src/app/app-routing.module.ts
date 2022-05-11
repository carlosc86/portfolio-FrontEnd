import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditorSeccionComponent } from './components/editor-seccion/editor-seccion.component';
import { PaginaPortfolioComponent } from './components/pagina-portfolio/pagina-portfolio.component';
import { Seccion404Component } from './components/seccion404/seccion404.component';

const routes: Routes = [
  
  {path:'',component:PaginaPortfolioComponent},
  {path:'**',component:Seccion404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
