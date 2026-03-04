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
import { RegistroPrestamoComponent } from './partials/registro-prestamo/registro-prestamo.component';
import { HistorialScreenComponent } from './services/historial-screen/historial-screen.component';
import { LibrosnodisponiblesScreenComponent } from './services/librosnodisponibles-screen/librosnodisponibles-screen.component';
import { HistorialClienteScreenComponent } from './services/historial-cliente-screen/historial-cliente-screen.component';
import { LibrospoScreenComponent } from './services/librospo-screen/librospo-screen.component';
import { ClientesactScreenComponent } from './services/clientesact-screen/clientesact-screen.component';
import { UsuariosScreenComponent } from './services/usuarios-screen/usuarios-screen.component';

const routes: Routes = [
  //Pantalla principal del login
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'cliente', component: ClienteScreenComponent, pathMatch: 'full' },
  { path: 'clientes-activos', component: ClientesactScreenComponent, pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosScreenComponent, pathMatch: 'full' },
  { path: 'autores', component: AutoresScreenComponent, pathMatch: 'full' },
  { path: 'libros', component: LibrosScreenComponent, pathMatch: 'full' },
  { path: 'libros-populares', component: LibrospoScreenComponent, pathMatch: 'full' },
  { path: 'libros-no', component: LibrosnodisponiblesScreenComponent, pathMatch: 'full' },
  { path: 'prestamos', component: PrestamosScreenComponent, pathMatch: 'full' },
  { path: 'historial', component: HistorialScreenComponent, pathMatch: 'full' },
  { path: 'historial-cliente', component: HistorialClienteScreenComponent, pathMatch: 'full' },
  { path: 'registro-autor', component: RegistroAutorComponent, pathMatch: 'full' },
  { path: 'generos', component: GenerosScreenComponent, pathMatch: 'full' },
  { path: 'registro-genero', component: RegistroGeneroComponent, pathMatch: 'full' },
  { path: 'registro-libro', component: RegistroLibroComponent, pathMatch: 'full' },
  { path: 'registro-prestamo', component: RegistroPrestamoComponent, pathMatch: 'full' },
  { path: 'registro-prestamo/:id', component: RegistroPrestamoComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
