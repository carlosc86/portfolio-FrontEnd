import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeccionComponent } from '../seccion/seccion.component';

@Component({
  selector: 'app-seccion404',
  templateUrl: './seccion404.component.html',
  styleUrls: ['./seccion404.component.css']
})
export class Seccion404Component extends SeccionComponent implements OnInit {

  constructor(private router:Router) { 
    super();
  }

  override ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['']);
  }

}
