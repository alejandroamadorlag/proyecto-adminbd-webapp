import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-eliminar-cliente-modal',
  templateUrl: './eliminar-cliente-modal.component.html',
  styleUrls: ['./eliminar-cliente-modal.component.scss']
})
export class EliminarClienteModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private clientesService: ClientesService,
    private dialogRef: MatDialogRef<EliminarClienteModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
      this.clientesService.eliminarCliente(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
  }
}
