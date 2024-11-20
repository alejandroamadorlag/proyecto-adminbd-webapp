import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GenerosService } from 'src/app/services/generos.service';
declare var $:any;

@Component({
  selector: 'app-registro-genero',
  templateUrl: './registro-genero.component.html',
  styleUrls: ['./registro-genero.component.scss']
})
export class RegistroGeneroComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public genero:any = {};
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";

    //Para el select
    public areas: any[] = [
      {value: 'genero', viewValue: 'Genero'},
    ];

  constructor(
    private generosService: GenerosService,
    private router: Router,
    private location : Location
  ){}

  ngOnInit(): void {
    this.genero = this.genero.esquemaGenero();

    this.genero.rol = this.rol;

    console.log("Datos del autor: ", this.genero);

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.generosService.validarGenero(this.genero, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
      //Entra a registrar
      this.generosService.registrarGenero(this.genero).subscribe(
        (response)=>{
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Genero registrado correctamente");
          console.log("Genero registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["home"]);
          }
        }, (error)=>{
          //Aquí se ejecuta el error
          alert("No se pudo registrar genero");
        }
      );
 }


  public actualizar(){

  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

    //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.genero.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.genero.fecha_nacimiento);
  }
}
