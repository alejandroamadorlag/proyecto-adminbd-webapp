import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { ClienteScreenComponent } from './services/cliente-screen/cliente-screen.component';
import { AutoresScreenComponent } from './services/autores-screen/autores-screen.component';
import { LibrosScreenComponent } from './services/libros-screen/libros-screen.component';
import { PrestamosScreenComponent } from './services/prestamos-screen/prestamos-screen.component';
import { RegistroAutorComponent } from './partials/registro-autor/registro-autor.component';
import { GenerosScreenComponent } from './services/generos-screen/generos-screen.component';
import { RegistroGeneroComponent } from './partials/registro-genero/registro-genero.component';
import { RegistroLibroComponent } from './partials/registro-libro/registro-libro.component';

const routes: Routes = [
  //Pantalla principal del login
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'cliente', component: ClienteScreenComponent, pathMatch: 'full' },
  { path: 'autores', component: AutoresScreenComponent, pathMatch: 'full' },
  { path: 'libros', component: LibrosScreenComponent, pathMatch: 'full' },
  { path: 'prestamos', component: PrestamosScreenComponent, pathMatch: 'full' },
  { path: 'registro-autor', component: RegistroAutorComponent, pathMatch: 'full' },
  { path: 'generos', component: GenerosScreenComponent, pathMatch: 'full' },
  { path: 'registro-genero', component: RegistroGeneroComponent, pathMatch: 'full' },
  { path: 'registro-libro', component: RegistroLibroComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
