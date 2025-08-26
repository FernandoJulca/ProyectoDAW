import { Component,Inject } from '@angular/core';

//modal
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../shared/model/producto.model';

@Component({
  selector: 'app-details-producto',
    template: `
    <h2 mat-dialog-title>Detalles del Proveedor</h2>
    <mat-dialog-content>

      <img [src]="'data:imagen/jpeg;base64,' + data.base64Img">
      <p><strong>ID:</strong> {{data.idProducto}}</p>
      <p><strong>Nombre:</strong> {{data.nombre}}</p>
      <p><strong>descripcion:</strong> {{data.descripcion}}</p>
      <p><strong>Proveedor:</strong> {{data.proveedor.razonSocial}}</p>
      <p><strong>Categoria:</strong> {{data.categoria.descripcion}}</p>
      <p><strong>Precio:</strong> S/.{{data.precio}}</p>
      <p><strong>Stock:</strong> {{data.stock }} unidades</p>
      <p><strong>Registrado:</strong> {{data.fechaRegistro | date:'dd/MM/yyyy HH:mm'}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class DetailsProductoComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data:Producto) 
   {}
}
