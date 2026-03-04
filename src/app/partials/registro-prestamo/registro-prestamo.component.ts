import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GenerosService } from 'src/app/services/generos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { LibrosService } from '../../services/libros.service';
import { PrestamosService } from '../../services/prestamos.service';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';

declare var $:any;

@Component({
  selector: 'app-registro-prestamo',
  templateUrl: './registro-prestamo.component.html',
  styleUrls: ['./registro-prestamo.component.scss']
})
export class RegistroPrestamoComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};
  @Input() id: string = "";

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public prestamo:any = {};
  public idPrestamo: Number = 0;
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";


  public array_user: any[] = [];
  public lista_libros: any[] = [];
  public lista_clientes: any[] = [];
  public lista_bibliotecarios: any[] = [];
  dataSource = this.lista_libros as DatosLibros[];
  dataSource2 = this.lista_clientes as DatosClientes[];
  dataSource3 = this.lista_bibliotecarios as DatosBibliotecarios[];


  constructor(
    private bibliotecariosService: BibliotecariosService,
    private clientesService: ClientesService,
    private librosService: LibrosService,
    private prestamosService: PrestamosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private location : Location
  ){}

  ngOnInit(): void {
    this.prestamo = this.librosService.esquemaLibro();

    this.prestamo.id = this.id;

    console.log("Datos del prestamo: ", this.prestamo);

    //Mandar a ejecutar la función
    this.obtenerListaLibros();
    this.obtenerListaClientes();
    this.obtenerListaBibliotecarios();

    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idPrestamo = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idPrestamo);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerPrestamoByID();
    }

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

    this.errors = this.prestamosService.validarPrestamo(this.prestamo, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
      //Entra a registrar
      this.prestamosService.registrarPrestamo(this.prestamo).subscribe(
        (response)=>{
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Préstamo registrado correctamente");

          console.log("Préstamo registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["home"]);
          }
        }, (error)=>{
          //Aquí se ejecuta el error
          alert("No se pudo registrar préstamo");
        }
      );
      const data = { id_libro: this.prestamo.id_libro };
      this.prestamosService.libroInactivo(data).subscribe(
        (response) => {

        },
        (error) => {
          alert("No se pudo desactivar el libro");
        }
      );
      const data2 = { id: this.prestamo.id_cliente };
      this.prestamosService.prestamosCliente(data2).subscribe(
        (response) => {

        },
        (error) => {
          alert("No se pudo incrementar el número de prestamos");
        }
      );
 }

 public obtenerPrestamoByID(){
  this.prestamosService.getPrestamoByID(this.idPrestamo).subscribe(
    (response)=>{
      this.prestamo = response;
      //Agregamos valores faltantes
      this.prestamo.nombre_fecha_prestamo = response.prestamo.nombre_fecha_prestamo;
      this.prestamo.nombre_fecha_devol_esperada = response.prestamo.nombre_fecha_devol_esperada;
      this.prestamo.nombre_fecha_devol_real = response.prestamo.nombre_fecha_devol_real;
      this.prestamo.nombre_id_bibliotecario = response.prestamo.nombre_id_bibliotecario;
      this.prestamo.nombre_id_libro = response.prestamo.nombre_id_libro;
      this.prestamo.nombre_id_cliente = response.prestamo.nombre_id_cliente;

      //this.materia.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
      console.log("Datos Prestamo: ", this.prestamo);
    }, (error)=>{
      alert("No se pudieron obtener los datos del prestamo para editar");
    }
  );
 }

   public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.prestamosService.validarPrestamo(this.prestamo, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.prestamosService.editarPrestamo(this.prestamo).subscribe(
      (response)=>{
        alert("Préstamo editado correctamente");
        console.log("Préstamo editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["prestamos"]);
      }, (error)=>{
        alert("No se pudo editar el préstamo");
      }
    );
    const data = { id_libro: this.prestamo.id_libro };
    this.prestamosService.libroActivo(data).subscribe(
      (response) => {
        alert("Libro Activado correctamente");
      },
      (error) => {
        alert("No se pudo activar el libro");
      }
    );
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
  public changeFecha1(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.prestamo.fecha_prestamo = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.prestamo.fecha_prestamo);
  }

  public changeFecha2(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.prestamo.fecha_devol_esperada = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.prestamo.fecha_devol_esperada);
  }

  public changeFecha3(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.prestamo.fecha_devol_real = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.prestamo.fecha_devol_real);
  }




  //Obtener lista de contactos empresariales
 public obtenerListaLibros(){
  this.librosService.obtenerListaLibros().subscribe(
    (response)=>{
      this.lista_libros = response;
      console.log("Lista libros: ", this.lista_libros);
      if(this.lista_libros.length > 0){
        this.dataSource = this.lista_libros as DatosLibros[];
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de libros");
    }
  );
}

//Obtener lista de contactos empresariales
public obtenerListaClientes(){
  this.clientesService.obtenerListaClientes().subscribe(
    (response)=>{
      this.lista_clientes = response;
      console.log("Lista clientes: ", this.lista_clientes);
      if(this.lista_clientes.length > 0){
        //Agregar datos del nombre e email
        this.lista_clientes.forEach(usuario => {
          usuario.first_name = usuario.user.first_name;
          usuario.last_name = usuario.user.last_name;
        });
        this.dataSource2 = this.lista_clientes as DatosClientes[];
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de clientes");
    }
  );
}

public obtenerListaBibliotecarios(){
  this.bibliotecariosService.obtenerListaBibliotecarios().subscribe(
    (response)=>{
      this.lista_bibliotecarios = response;
      console.log("Lista bibliotecarios: ", this.lista_bibliotecarios);
      if(this.lista_bibliotecarios.length > 0){
        //Agregar datos del nombre e email
        this.lista_bibliotecarios.forEach(usuario => {
          usuario.first_name = usuario.user.first_name;
          usuario.last_name = usuario.user.last_name;
        });
        console.log("Bibliotecarios: ", this.lista_bibliotecarios);

        this.dataSource3 = this.lista_bibliotecarios as DatosBibliotecarios[];      }
    }, (error)=>{
      alert("No se pudo obtener la lista de bibliotecarios");
    }
  );
}

}

export interface DatosLibros {
  id_libro: number,
  titulo: string;
}

export interface DatosClientes {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface DatosBibliotecarios {
  id: number;
  first_name: string;
  last_name: string;
}
