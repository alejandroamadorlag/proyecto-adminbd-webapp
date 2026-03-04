import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-eliminar-genero-modal',
  templateUrl: './eliminar-genero-modal.component.html',
  styleUrls: ['./eliminar-genero-modal.component.scss']
})
export class EliminarGeneroModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private generosService: GenerosService,
    private dialogRef: MatDialogRef<EliminarGeneroModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.generosService.eliminarGenero(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}
