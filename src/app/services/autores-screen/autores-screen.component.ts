import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-autores-screen',
  templateUrl: './autores-screen.component.html',
  styleUrls: ['./autores-screen.component.scss']
})
export class AutoresScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_autores: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_bibliotecario', 'nombre', 'nacionalidad', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosAutor>(this.lista_autores as DatosAutor[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public autoresService: AutoresService,
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
    this.obtenerAutores();
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

   //Obtener lista de usuarios
   public obtenerAutores(){
    this.autoresService.obtenerListaAutores().subscribe(
      (response)=>{
        this.lista_autores = response;
        console.log("Lista materias: ", this.lista_autores);
        if(this.lista_autores.length > 0){
            this.dataSource = new MatTableDataSource<DatosAutor>(this.lista_autores as DatosAutor[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias");
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
export interface DatosAutor {
  id: number,
  id_autor: string;
  first_name: string;
  last_name: string;
  nacionalidad: string;
  is_active: number;
}
