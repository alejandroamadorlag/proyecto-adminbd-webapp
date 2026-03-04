import { PrestamosService } from './../prestamos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from 'src/app/services/facade.service';
import { LibrosService } from 'src/app/services/libros.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EliminarPrestamoModalComponent } from 'src/app/modals/eliminar-prestamo-modal/eliminar-prestamo-modal.component';

@Component({
  selector: 'app-prestamos-screen',
  templateUrl: './prestamos-screen.component.html',
  styleUrls: ['./prestamos-screen.component.scss']
})
export class PrestamosScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_prestamos: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id', 'fecha_prestamo', 'fecha_devol_esperada', 'fecha_devol_real', 'id_bibliotecario', 'id_libro', 'id_cliente', 'estado', 'editar'];
  dataSource = new MatTableDataSource<DatosPrestamo>(this.lista_prestamos as DatosPrestamo[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public librosService: LibrosService,
    public clientesService: ClientesService,
    public prestamosService: PrestamosService,
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
    this.obtenerPrestamos();
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
   public obtenerPrestamos(){
    this.prestamosService.obtenerListaPrestamos().subscribe(
      (response)=>{
        this.lista_prestamos = response;
        console.log("Lista prestamos: ", this.lista_prestamos);
        if(this.lista_prestamos.length > 0){
            this.dataSource = new MatTableDataSource<DatosPrestamo>(this.lista_prestamos as DatosPrestamo[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de prestamos");
      }
    );
  }

  public goEditar(idPrestamo: number){
    this.router.navigate(["registro-prestamo/"+idPrestamo]);
  }

  public delete(idPrestamo: number){
    //console.log("User:", idUser);
    const dialogRef = this.dialog.open(EliminarPrestamoModalComponent,{
     data: {id: idPrestamo}, //Se pasan valores a través del componente
     height: '288px',
     width: '328px',
   });
   //Esta se ejecuta después de un evento que cierra el modal
   dialogRef.afterClosed().subscribe(result => {
     if(result.isDelete){
       console.log("Préstamo eliminado");
       //Recargar página
       alert("Préstamo eliminado correctamente");
       window.location.reload();
     }else{
       alert("Préstamo no eliminado ");
       console.log("No se eliminó el préstamo");
     }
   });
   }
}//Fin de la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosPrestamo {
  id: number,
  fecha_prestamo: string;
  fecha_devol_esperada: string;
  fecha_devol_real: string;
  id_bibliotecario: string;
  id_libro: string;
  id_cliente: string;
  estado: string;
  is_active: number;
}
