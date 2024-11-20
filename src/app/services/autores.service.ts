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
export class AutoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaAutor(){
    return {
      'id_autor': '',
      'first_name': '',
      'last_name': '',
      'nacionalidad': '',
    }
  }

  //Validación para el formulario
  public validarAutor(data: any, editar: boolean){
    console.log("Validando autor... ", data);

    let error: any = [];

    if(!this.validatorService.required(data["id_autor"])){
      error["id_autor"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }


    if(!this.validatorService.required(data["nacionalidad"])){
      error["nacionalidad"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarAutor (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/autores/`,data, httpOptions);
  }

  public obtenerListaAutores (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-autores/`, {headers:headers});
  }



}
