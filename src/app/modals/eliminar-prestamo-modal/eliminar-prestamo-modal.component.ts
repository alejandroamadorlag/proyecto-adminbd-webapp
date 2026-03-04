import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'app-eliminar-prestamo-modal',
  templateUrl: './eliminar-prestamo-modal.component.html',
  styleUrls: ['./eliminar-prestamo-modal.component.scss']
})
export class EliminarPrestamoModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private prestamosService: PrestamosService,
    private dialogRef: MatDialogRef<EliminarPrestamoModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.prestamosService.eliminarPrestamo(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}

