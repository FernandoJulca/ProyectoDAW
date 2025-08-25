import { Component } from '@angular/core';

//service
import { ProductoServiceService } from '../../service/producto-service.service';

//formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
//entidad
import { Producto } from '../../../shared/model/producto.model';
//angular material
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-create-producto',
  standalone : true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css'
})
export class CreateProductoComponent {

  producto:Producto = {
      nombre: '',
      descripcion: '',
      proveedor:{
        idProveedor :0,
        distrito :{
          idDistrito :0,
          nombre : ''
        }
      },
      categoria:{idCategoria:0,descripcion:''},
      precio:0,
      stock:0,
      fechaRegistro:'',
      estado:true
  }

  constructor (
    private productoService:ProductoServiceService,
    private router: Router
  ){}

  guardarProveedor():void{
    this.productoService.createProducto(this.producto).subscribe({
      next: (data) =>{
        console.log("Producto Creado" + data)
        this.router.navigate(['/admin/crudProducto/'])
      },
      error : (err) =>{
        console.log("Error: ", err)
      }
    })
  }
}
