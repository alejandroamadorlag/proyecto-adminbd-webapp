import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit{
  public token : string = "";
  public rol: string = "";


  constructor(
    private facadeService: FacadeService,
    private router: Router
  ){}

  ngOnInit(): void {
     //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }


    this.rol = this.facadeService.getUserGroup();
    console.log("Rol: ", this.rol);
  }
}
