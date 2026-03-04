import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from 'src/app/services/facade.service';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';
import { EliminarBiblioModalComponent } from 'src/app/modals/eliminar-biblio-modal/eliminar-biblio-modal.component';

@Component({
  selector: 'app-usuarios-screen',
  templateUrl: './usuarios-screen.component.html',
  styleUrls: ['./usuarios-screen.component.scss']
})
export class UsuariosScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_users: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id', 'nombre', 'email', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_users as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public bibliotecariosService: BibliotecariosService,
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
    this.obtenerUsuarios();
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
  public obtenerUsuarios(){
    this.bibliotecariosService.obtenerListaUsers().subscribe(
      (response)=>{
        this.lista_users = response;
        console.log("Lista users: ", this.lista_users);
        if(this.lista_users.length > 0){
            this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_users as DatosUsuario[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de users");
      }
    );
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro/cliente/"+idUser]);
  }


  public delete(idBiblio: number){
    //console.log("User:", idUser);
    const dialogRef = this.dialog.open(EliminarBiblioModalComponent,{
     data: {id: idBiblio}, //Se pasan valores a través del componente
     height: '288px',
     width: '328px',
   });
   //Esta se ejecuta después de un evento que cierra el modal
   dialogRef.afterClosed().subscribe(result => {
     if(result.isDelete){
       console.log("Usuario eliminado");
       //Recargar página
       alert("Usuario eliminado correctamente");
       window.location.reload();
     }else{
       alert("Usuario no eliminado ");
       console.log("No se eliminó el usuario");
     }
   });
   }
}//Fin de la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  first_name: string;
  last_name: string;
  email: string;
}
