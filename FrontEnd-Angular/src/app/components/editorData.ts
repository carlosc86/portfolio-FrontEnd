import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DataPortfolio } from "../services/data";
import { DataService } from "../services/dataService";

/* Clase generica para el manejo de edicion de elementos */

@Component({
    selector: 'app-editor-data-component',
    template: '<h1>Editor</h1>',
    styleUrls:[]
})
export abstract class EditorData<T extends DataPortfolio> implements OnInit{

    public lista:T[]=[];
    public elemento:T;
    public copia:T;
    public forms!:FormGroup;
    public modal!:HTMLElement;
    public hadError=false;
    public mensajeError="";

    constructor(protected dataService:DataService<T>){
        this.elemento=this.borrarElemento();
        this.copia=this.borrarElemento();

    } 

    ngOnInit(){
        this.dataService.traer().subscribe(dato=>{
            this.lista=dato;
        });
    }

    //Cancela la modificacion o creacion de un elemento
    cancelar(){
        let indice=this.lista.indexOf(this.elemento);
        this.elemento=this.copiarElemento(this.copia);
        this.lista[indice]=this.elemento;
        this.resetForm();
    }

    //Acepta la modificacion o creacion de un elemento
    aceptar(){
        this.forms.markAllAsTouched();//Marco como tocado todo el formulario para que aparezcan las validaciones
        if(this.forms.valid){ //Si el formulario es valido
            //Hago el insert o el update
            if(isNaN(this.elemento.id)){
                this.dataService.agregar(this.elemento).subscribe(dato=>{
                    this.elemento.id=dato.id;
                    this.lista.push(this.elemento);
                    this.resetForm();
                    this.modal?.click();
                }, error=>{
                    this.tratarError(error);
                    this.hadError=true;
                });
            }else{
                this.dataService.modificar(this.elemento).subscribe(dato=>{
                    this.resetForm();
                    this.modal?.click();
                }, error=>{
                    this.tratarError(error);
                    this.hadError=true;
                });
            }
        }
    }

    //Elimina un elemento
    eliminar(){
        if(!isNaN(this.elemento.id)){
            this.dataService.borrar(this.elemento).subscribe(dato=>{
                let indice=this.lista.indexOf(this.elemento);
                this.lista.splice(indice,1);
                this.resetForm();
            });
        }
    }
    
    //Establece como activo un elemento y hace una copia para poder deshacer los cambios si se cancela
    setActivo(dato:T){
        this.elemento=dato;
        this.copia=this.copiarElemento(dato);
    }
    
    //Reestablece el formulario
    resetForm(){
        this.elemento=this.borrarElemento();
        this.hadError=false;
        this.forms!.reset();   
    }

    //Hace una copia del elemento
    protected  copiarElemento(dato:T):T{
        return JSON.parse(JSON.stringify(dato));
    }

    //Metodo que se debe implementar para cada clase concreta
    protected abstract borrarElemento():T; //Devuelve un elemento limpio

    //Metodo para tratar errores, se puede sobreescribir para personalizarlo en cada editor
    protected tratarError(error:any){
        if(error.status===401){
            this.mensajeError="Error de authenticacion, porfavor vuelva a loguear."
        }else{
            this.mensajeError="Ocurrió un error";
        }
    }
    


}