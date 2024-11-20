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
export class LibrosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaLibro(){
    return {
      'id_libro': '',
      'titulo': '',
      'id_autor': '',
      'id_genero': '',
      'fecha_registro': '',
    }
  }

  //Validación para el formulario
  public validarLibro(data: any, editar: boolean){
    console.log("Validando autor... ", data);

    let error: any = [];

    if(!this.validatorService.required(data["id_libro"])){
      error["id_libro"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["titulo"])){
      error["titulo"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_autor"])){
      error["id_autor"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_genero"])){
      error["id_genero"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["fecha_registro"])){
      error["fecha_registro"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarLibro (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/libros/`,data, httpOptions);
  }

  public obtenerListaLibros (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-libros/`, {headers:headers});
  }



}
