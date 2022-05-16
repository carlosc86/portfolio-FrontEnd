import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CredencialData } from '../credencialData';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  
  @ViewChild('modalLogin') modal?:ElementRef;
  
  credenciales:CredencialData={
    user:"",
    password:""
  }

  mensajeError="";
  hadError=false;

  form:FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthenticationService) { 
    this.form=fb.group({
      usuario:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }
  //Metodos para simplificar el uso del form en el template
  get usuario(){return this.form.get("usuario")!}
  get password(){return this.form.get("password")!}
  
  //Metodo para llamar al servicio de login
  login(event:Event){
    event.preventDefault();
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.authService.login(this.credenciales).subscribe(data=>{
        console.log("Se inicio sesion exitosamente ");
        this.hadError=false;
        this.modal?.nativeElement.click();
      },error=>{
        if(error.status===401){
          console.log("Error de logueo");
          this.mensajeError="Usuario o password incorrectos."
          this.hadError=true;
        }        
      });
    }
    
      
  
  }

}
