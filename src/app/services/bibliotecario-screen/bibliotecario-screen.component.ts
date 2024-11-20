import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';

@Component({
  selector: 'app-bibliotecario-screen',
  templateUrl: './bibliotecario-screen.component.html',
  styleUrls: ['./bibliotecario-screen.component.scss']
})
export class BibliotecarioScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_bibliotecarios: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_bibliotecario', 'nombre', 'email', 'telefono', 'rfc', 'direccion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosBibliotecario>(this.lista_bibliotecarios as DatosBibliotecario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public bibliotecariosService: BibliotecariosService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Obtener Alumnos
    this.obtenerBibliorecarios();
    //Para paginador
    this.initPaginator();
  }

  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener Alumnos
  public obtenerBibliorecarios(){
    this.bibliotecariosService.obtenerListaBibliotecarios().subscribe(
      (response)=>{
        this.lista_bibliotecarios = response;
        console.log("Lista bibliotecarios: ", this.lista_bibliotecarios);
        if(this.lista_bibliotecarios.length > 0){
          //Agregar datos del nombre e email
          this.lista_bibliotecarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Bibliotecarios: ", this.lista_bibliotecarios);

          this.dataSource = new MatTableDataSource<DatosBibliotecario>(this.lista_bibliotecarios as DatosBibliotecario[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de bibliotecarios");
      }
    );
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro/cliente/"+idUser]);
  }

  public delete(userId: number){

  }
}//Fin de la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosBibliotecario {
  id: number,
  id_bibliotecario: string;
  first_name: string;
  last_name: string;
  email: string;
  telefono: string,
  rfc: string,
  direccion: string,
}
