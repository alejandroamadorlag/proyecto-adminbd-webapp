import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BibliotecariosService } from 'src/app/services/bibliotecarios.service';

@Component({
  selector: 'app-eliminar-biblio-modal',
  templateUrl: './eliminar-biblio-modal.component.html',
  styleUrls: ['./eliminar-biblio-modal.component.scss']
})
export class EliminarBiblioModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private bibliotecariosService: BibliotecariosService,
    private dialogRef: MatDialogRef<EliminarBiblioModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.bibliotecariosService.eliminarBiblio(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}
