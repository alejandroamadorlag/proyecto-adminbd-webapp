import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Elementos de angular material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
//Para usar el mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
//Cambia el idioma a español
import { MAT_DATE_LOCALE } from '@angular/material/core';

//Screens
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { RegistroBiblioComponent } from './partials/registro-biblio/registro-biblio.component';
import { RegistroClienteComponent } from './partials/registro-cliente/registro-cliente.component';
import { BibliotecarioScreenComponent } from './services/bibliotecario-screen/bibliotecario-screen.component';
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
import { EliminarGeneroModalComponent } from './modals/eliminar-genero-modal/eliminar-genero-modal.component';
import { EliminarBiblioModalComponent } from './modals/eliminar-biblio-modal/eliminar-biblio-modal.component';
import { EliminarClienteModalComponent } from './modals/eliminar-cliente-modal/eliminar-cliente-modal.component';
import { UsuariosScreenComponent } from './services/usuarios-screen/usuarios-screen.component';
import { EliminarAutorModalComponent } from './modals/eliminar-autor-modal/eliminar-autor-modal.component';
import { EliminarLibroModalComponent } from './modals/eliminar-libro-modal/eliminar-libro-modal.component';
import { EliminarPrestamoModalComponent } from './modals/eliminar-prestamo-modal/eliminar-prestamo-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    NavbarComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    RegistroBiblioComponent,
    RegistroClienteComponent,
    BibliotecarioScreenComponent,
    ClienteScreenComponent,
    AutoresScreenComponent,
    LibrosScreenComponent,
    PrestamosScreenComponent,
    RegistroAutorComponent,
    GenerosScreenComponent,
    RegistroGeneroComponent,
    RegistroLibroComponent,
    RegistroPrestamoComponent,
    HistorialScreenComponent,
    LibrosnodisponiblesScreenComponent,
    HistorialClienteScreenComponent,
    LibrospoScreenComponent,
    ClientesactScreenComponent,
    EliminarGeneroModalComponent,
    EliminarBiblioModalComponent,
    EliminarClienteModalComponent,
    UsuariosScreenComponent,
    EliminarAutorModalComponent,
    EliminarLibroModalComponent,
    EliminarPrestamoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
