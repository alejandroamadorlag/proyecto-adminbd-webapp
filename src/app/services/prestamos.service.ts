import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaLibro(){
    return {
      'fecha_prestamo': '',
      'fecha_devol_esperada': '',
      'fecha_devol_real': '',
      'id_bibliotecario': '',
      'id_libro': '',
      'id_cliente': '',
    }
  }

  //Validación para el formulario
  public validarPrestamo(data: any, editar: boolean){
    console.log("Validando prestamo... ", data);

    let error: any = [];

    if(!this.validatorService.required(data["fecha_prestamo"])){
      error["fecha_prestamo"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["fecha_devol_esperada"])){
      error["fecha_devol_esperada"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_bibliotecario"])){
      error["id_bibliotecario"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_libro"])){
      error["id_libro"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_cliente"])){
      error["id_cliente"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarPrestamo (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/prestamos/`,data, httpOptions);
  }

  public libroInactivo (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/libro-inactivo/`, data, {headers:headers});
  }

  public libroActivo (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/libro-activo/`, data, {headers:headers});
  }

  public prestamosCliente (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/cliente-prestamos/`, data, {headers:headers});
  }

  public obtenerListaPrestamos (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-prestamos/`, {headers:headers});
  }

  public obtenerListaHitorial (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/historial/`, {headers:headers});
  }

  public obtenerHistorialCliente (id_cliente: String): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-prestamos-cliente/?id=${id_cliente}`, {headers:headers});
  }

  public getPrestamoByID(idPrestamo: Number){
    return this.http.get<any>(`${environment.url_api}/prestamos/?id=${idPrestamo}`,httpOptions);
  }

  public editarPrestamo (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/prestamos-edit/`, data, {headers:headers});
  }

  //Eliminar contacto empresarial
  public eliminarPrestamo(idPrestamo: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/prestamos-edit/?id=${idPrestamo}`,{headers:headers});
   }



}

