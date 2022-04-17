import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionInicioComponent } from './components/seccion-inicio/seccion-inicio.component';
import { EditorSeccionComponent } from './components/editor-seccion/editor-seccion.component';
import { SeccionAcercaDeComponent } from './components/seccion-acerca-de/seccion-acerca-de.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { SeccionTrabajosComponent } from './components/seccion-trabajos/seccion-trabajos.component';
import { SeccionContactoComponent } from './components/seccion-contacto/seccion-contacto.component';
import { EditorEstudioComponent } from './components/editor-estudio/editor-estudio.component';
import { InfoEstudioComponent } from './components/info-estudio/info-estudio.component';
import { InfoHabilidadComponent } from './components/info-habilidad/info-habilidad.component';

@NgModule({
  declarations: [
    AppComponent,
    SeccionInicioComponent,
    EditorSeccionComponent,
    SeccionAcercaDeComponent,
    SeccionComponent,
    SeccionTrabajosComponent,
    SeccionContactoComponent,
    EditorEstudioComponent,
    InfoEstudioComponent,
    InfoHabilidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
