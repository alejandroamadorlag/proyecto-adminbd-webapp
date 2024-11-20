import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-screen',
  templateUrl: './cliente-screen.component.html',
  styleUrls: ['./cliente-screen.component.scss']
})
export class ClienteScreenComponent implements OnInit {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_clientes: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_bibliotecario', 'nombre', 'email', 'telefono', 'direccion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosCliente>(this.lista_clientes as DatosCliente[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public clientesService: ClientesService,
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
    this.obtenerClientes();
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
  public obtenerClientes(){
    this.clientesService.obtenerListaClientes().subscribe(
      (response)=>{
        this.lista_clientes = response;
        console.log("Lista clientes: ", this.lista_clientes);
        if(this.lista_clientes.length > 0){
          //Agregar datos del nombre e email
          this.lista_clientes.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("clientes: ", this.lista_clientes);

          this.dataSource = new MatTableDataSource<DatosCliente>(this.lista_clientes as DatosCliente[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de clientes");
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
export interface DatosCliente {
  id: number,
  id_cliente: string;
  first_name: string;
  last_name: string;
  email: string;
  telefono: string,
  direccion: string,
}
