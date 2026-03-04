import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-eliminar-autor-modal',
  templateUrl: './eliminar-autor-modal.component.html',
  styleUrls: ['./eliminar-autor-modal.component.scss']
})
export class EliminarAutorModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private autoresService: AutoresService,
    private dialogRef: MatDialogRef<EliminarAutorModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.autoresService.eliminarAutor(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}
