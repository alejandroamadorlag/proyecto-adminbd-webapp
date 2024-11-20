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
