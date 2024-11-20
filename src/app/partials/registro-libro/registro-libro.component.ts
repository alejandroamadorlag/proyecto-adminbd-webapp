import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GenerosService } from 'src/app/services/generos.service';
import { AutoresService } from 'src/app/services/autores.service';
import { LibrosService } from '../../services/libros.service';
declare var $:any;

@Component({
  selector: 'app-registro-libro',
  templateUrl: './registro-libro.component.html',
  styleUrls: ['./registro-libro.component.scss']
})
export class RegistroLibroComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public libro:any = {};
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";
  public idlibro: Number = 0;
  public array_user: any[] = [];
  public lista_autores: any[] = [];
  public lista_generos: any[] = [];
  dataSource = this.lista_autores as DatosAutores[];
  dataSource2 = this.lista_generos as DatosGeneros[];


  constructor(
    private generosService: GenerosService,
    private autoresService: AutoresService,
    private librosService: LibrosService,
    private router: Router,
    private location : Location
  ){}

  ngOnInit(): void {
    this.libro = this.librosService.esquemaLibro();

    console.log("Datos del libro: ", this.libro);

    //Mandar a ejecutar la función
    this.obtenerListaAutores();
    this.obtenerListaGeneros();

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

    this.errors = this.librosService.validarLibro(this.libro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
      //Entra a registrar
      this.librosService.registrarLibro(this.libro).subscribe(
        (response)=>{
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Libro registrado correctamente");
          console.log("Libro registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["home"]);
          }
        }, (error)=>{
          //Aquí se ejecuta el error
          alert("No se pudo registrar libro");
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

    this.libro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.libro.fecha_nacimiento);
  }

  //Obtener lista de contactos empresariales
 public obtenerListaAutores(){
  this.autoresService.obtenerListaAutores().subscribe(
    (response)=>{
      this.lista_autores = response;
      console.log("Lista autores: ", this.lista_autores);
      if(this.lista_autores.length > 0){
        this.dataSource = this.lista_autores as DatosAutores[];
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de autores");
    }
  );
}

//Obtener lista de contactos empresariales
public obtenerListaGeneros(){
  this.generosService.obtenerListaGeneros().subscribe(
    (response)=>{
      this.lista_generos = response;
      console.log("Lista generos: ", this.lista_generos);
      if(this.lista_generos.length > 0){
        this.dataSource2 = this.lista_generos as DatosGeneros[];
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de generos");
    }
  );
}

}

export interface DatosAutores {
  id: number,
  id_autor: string;
  first_name: string;
  last_name: string;
}

export interface DatosGeneros {
  id: number,
  id_genero: string;
  nombre_genero: string;
}
