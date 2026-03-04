import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() tipo: string = "";
  @Input() rol:string ="";

  public token : string = "";
  public editar:boolean = false;

  constructor(
    private facadeService: FacadeService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit() {
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
    }

  }

  public goRegistro(){
    this.router.navigate(["registro"]);
  }

  public goRegistroAutor(){
    this.router.navigate(["registro-autor"]);
  }

  public goRegistroGenero(){
    this.router.navigate(["registro-genero"]);
  }

  public goRegistroLibro(){
    this.router.navigate(["registro-libro"]);
  }

  public goRegistroPrestamos(){
    this.router.navigate(["registro-prestamo"]);
  }

  public goPrestamos(){
    this.router.navigate(["prestamos"]);
  }

  public goHistorialPrestamos(){
    this.router.navigate(["historial"]);
  }

  public goLibrosDisponibles(){
    this.router.navigate(["libros"]);
  }

  public goLibrosNoDisponibles(){
    this.router.navigate(["libros-no"]);
  }

  public goLibrosPopulares(){
    this.router.navigate(["libros-populares"]);
  }

  public goClientesActivos(){
    this.router.navigate(["clientes-activos"]);
  }


  //Cerrar sesión
  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        console.log("Entró");

        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }
  public activarLink(link: string){
    if(link == "home"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#genero").removeClass("active");
      $("#principal").addClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "autores"){
      $("#autor").addClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "libros"){
      $("#autor").removeClass("active");
      $("#libro").addClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "cliente"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").addClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "prestamos"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").addClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "generos"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").addClass("active");
      $("#historial").removeClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "historial-cliente"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").addClass("active");
      $("#usuario").removeClass("active");
    }else if(link == "usuarios"){
      $("#autor").removeClass("active");
      $("#libro").removeClass("active");
      $("#cliente").removeClass("active");
      $("#prestamo").removeClass("active");
      $("#principal").removeClass("active");
      $("#genero").removeClass("active");
      $("#historial").removeClass("active");
      $("#usuario").addClass("active");
    }
  }
}
