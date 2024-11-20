import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";
  public user:any = {};

  //Banderas para el tipo de usuario
  public isBiblio:boolean = false;
  public isCliente:boolean = false;
  public editar: boolean = false;
  public tipo_user:string = "";
  //Info del usuario
  public idUser: Number = 0;
  public rol: string = "";

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private bibliotecariosService: BibliotecariosService
  ){}

  ngOnInit(): void {

  }



  public radioChange(event: MatRadioChange) {
    if(event.value == "bibliotecario"){
      this.isBiblio = true;
      this.tipo_user = "bibliotecario"
      this.isCliente = false;
    }else if(event.value == "cliente"){
      this.isBiblio = false;
      this.isCliente = true;
      this.tipo_user = "cliente"
    }
  }
}
