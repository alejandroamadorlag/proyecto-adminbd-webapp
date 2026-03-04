import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-eliminar-libro-modal',
  templateUrl: './eliminar-libro-modal.component.html',
  styleUrls: ['./eliminar-libro-modal.component.scss']
})
export class EliminarLibroModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private librosService: LibrosService,
    private dialogRef: MatDialogRef<EliminarLibroModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.librosService.eliminarLibro(this.data.id_libro).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}

