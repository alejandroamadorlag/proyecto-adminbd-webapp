import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-generos-screen',
  templateUrl: './generos-screen.component.html',
  styleUrls: ['./generos-screen.component.scss']
})
export class GenerosScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_generos: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_genero', 'nombre_genero', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosGenero>(this.lista_generos as DatosGenero[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public generosService: GenerosService,
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
    this.obtenerGeneros();
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
   public obtenerGeneros(){
    this.generosService.obtenerListaGeneros().subscribe(
      (response)=>{
        this.lista_generos = response;
        console.log("Lista generos: ", this.lista_generos);
        if(this.lista_generos.length > 0){
            this.dataSource = new MatTableDataSource<DatosGenero>(this.lista_generos as DatosGenero[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de generos");
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
export interface DatosGenero {
  id: number,
  id_genero: string;
  nombre_genero: string;
  is_active: number;
}
