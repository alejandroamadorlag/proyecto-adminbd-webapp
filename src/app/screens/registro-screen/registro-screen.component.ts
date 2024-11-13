import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public bibliotecario:any = {};
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";

  constructor(
    private bibliotecariosService: BibliotecariosService,
    private router: Router,
    private location : Location
  ){}

  ngOnInit(): void {
    this.bibliotecario = this.bibliotecariosService.esquemaBibliotecario();

    this.bibliotecario.rol = this.rol;

    console.log("Datos del bibliotecario: ", this.bibliotecario);

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

     this.errors = this.bibliotecariosService.validarAdmin(this.bibliotecario, this.editar);
     if(!$.isEmptyObject(this.errors)){
       return false;
     }

     //Validar la contraseña
     if(this.bibliotecario.password == this.bibliotecario.confirmar_password){
       //Entra a registrar
       this.bibliotecariosService.registrarBibliotecario(this.bibliotecario).subscribe(
         (response)=>{
           //Aquí va la ejecución del servicio si todo es correcto
           alert("Usuario registrado correctamente");
           console.log("Usuario registrado: ", response);
           if(this.token != ""){
             this.router.navigate(["home"]);
           }else{
             this.router.navigate(["/"]);
           }
         }, (error)=>{
           //Aquí se ejecuta el error
           alert("No se pudo registrar usuario");
         }
       );
     }else{
       alert("Las contraseñas no coinciden");
       this.bibliotecario.password="";
       this.bibliotecario.confirmar_password="";
     }
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

    this.bibliotecario.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.bibliotecario.fecha_nacimiento);
  }
}
