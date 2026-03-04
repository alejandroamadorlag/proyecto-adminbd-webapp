import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from 'src/app/services/facade.service';
import { LibrosService } from 'src/app/services/libros.service';
import { EliminarLibroModalComponent } from 'src/app/modals/eliminar-libro-modal/eliminar-libro-modal.component';

@Component({
  selector: 'app-libros-screen',
  templateUrl: './libros-screen.component.html',
  styleUrls: ['./libros-screen.component.scss']
})
export class LibrosScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_libros: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_libro', 'titulo', 'id_autor', 'id_genero', 'fecha_registro', 'editar', 'eliminar'];

  dataSource = new MatTableDataSource<DatosLibro>(this.lista_libros as DatosLibro[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public librosService: LibrosService,
    public dialog: MatDialog,
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
    this.obtenerLibros();
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
   public obtenerLibros(){
    this.librosService.obtenerListaLibros().subscribe(
      (response)=>{
        this.lista_libros = response;
        console.log("Lista libros: ", this.lista_libros);
        if(this.lista_libros.length > 0){
            this.dataSource = new MatTableDataSource<DatosLibro>(this.lista_libros as DatosLibro[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de libros");
      }
    );
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro/cliente/"+idUser]);
  }

  public delete(id_libro: number){
    //console.log("User:", idUser);
    const dialogRef = this.dialog.open(EliminarLibroModalComponent,{
     data: {id_libro: id_libro}, //Se pasan valores a través del componente
     height: '288px',
     width: '328px',
   });
   //Esta se ejecuta después de un evento que cierra el modal
   dialogRef.afterClosed().subscribe(result => {
     if(result.isDelete){
       console.log("Libro eliminado");
       //Recargar página
       alert("Libro eliminado correctamente");
       window.location.reload();
     }else{
       alert("Libro no eliminado ");
       console.log("No se eliminó el libro");
     }
   });
   }
}//Fin de la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosLibro {
  id_libro: number,
  titulo: string;
  id_autor: string;
  id_genero: string;
  fecha_registro: string;
  veces_prestado: number;
  is_active: number;
}

