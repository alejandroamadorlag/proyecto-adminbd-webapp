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
export class GenerosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaAutor(){
    return {
      'id_genero': '',
      'nombre_genero': '',
    }
  }

  //Validación para el formulario
  public validarGenero(data: any, editar: boolean){
    console.log("Validando autor... ", data);

    let error: any = [];

    if(!this.validatorService.required(data["id_genero"])){
      error["id_genero"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["nombre_genero"])){
      error["nombre_genero"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarGenero (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/generos/`,data, httpOptions);
  }

  public obtenerListaGeneros (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-generos/`, {headers:headers});
  }



}
