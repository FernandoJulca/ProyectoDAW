import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../shared/model/producto.model';
import { ProductoServiceService } from '../../service/producto-service.service';
@Component({
  selector: 'app-desactivar-producto',
  standalone : true,
  imports: [
    MatDialogModule,
     CommonModule
  ],
  template : `
    <h2 mat-dialog-title>Confirmar desactivación</h2>
    <mat-dialog-content>
      <p>¿Seguro que quieres desactivar el producto <b>{{ data.nombre }}</b>?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button color="warn" (click)="onDesactivar()">Desactivar</button>
    </mat-dialog-actions>
  `,

  styleUrl: './desactivar-producto.component.css'
})
export class DesactivarProductoComponent {
constructor (
  @Inject (MAT_DIALOG_DATA) public data : Producto,
  private dialogRef: MatDialogRef<DesactivarProductoComponent>,
    private productoService: ProductoServiceService){}


  onCancel(){
    this.dialogRef.close(false);
  }

  onDesactivar(){
    this.productoService.desactivarProducto(this.data.idProducto!).subscribe({
      next : (mensaje) =>{
        this.dialogRef.close(true);
      }
    })
  }
  }


