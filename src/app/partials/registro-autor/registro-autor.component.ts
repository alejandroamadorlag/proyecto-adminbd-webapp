import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AutoresService } from 'src/app/services/autores.service';
declare var $:any;

@Component({
  selector: 'app-registro-autor',
  templateUrl: './registro-autor.component.html',
  styleUrls: ['./registro-autor.component.scss']
})
export class RegistroAutorComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public autor:any = {};
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";

    //Para el select
    public areas: any[] = [
      {value: 'autor', viewValue: 'Autor'},
    ];

  constructor(
    private autoresService: AutoresService,
    private router: Router,
    private location : Location
  ){}

  ngOnInit(): void {
    this.autor = this.autor.esquemaCliente();

    this.autor.rol = this.rol;

    console.log("Datos del autor: ", this.autor);

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

    this.errors = this.autoresService.validarAutor(this.autor, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
      //Entra a registrar
      this.autoresService.registrarAutor(this.autor).subscribe(
        (response)=>{
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Autor registrado correctamente");
          console.log("Autor registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["home"]);
          }
        }, (error)=>{
          //Aquí se ejecuta el error
          alert("No se pudo registrar autor");
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

    this.autor.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.autor.fecha_nacimiento);
  }
}
