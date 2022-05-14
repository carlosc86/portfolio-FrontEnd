import { NgModule } from '@angular/core';
import { ExtraOptions, Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditorSeccionComponent } from './components/editor-seccion/editor-seccion.component';
import { PaginaCargaComponent } from './components/pagina-carga/pagina-carga.component';
import { PaginaPortfolioComponent } from './components/pagina-portfolio/pagina-portfolio.component';
import { SeccionAcercaDeComponent } from './components/seccion-acerca-de/seccion-acerca-de.component';
import { SeccionContactoComponent } from './components/seccion-contacto/seccion-contacto.component';
import { SeccionInicioComponent } from './components/seccion-inicio/seccion-inicio.component';
import { SeccionTrabajosComponent } from './components/seccion-trabajos/seccion-trabajos.component';
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
