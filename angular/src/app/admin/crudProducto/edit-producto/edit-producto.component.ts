import { Component, OnInit } from '@angular/core';

import {  ProductoServiceService } from '../../service/producto-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { Producto } from '../../../shared/model/producto.model';

// Angular Material
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-producto',
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
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent implements OnInit{
  producto:Producto = {
      idProducto : 0,
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
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'))
      this.productoService.detalleProducto(id).subscribe({
        next : (data) =>{
          this.producto = data
        },
        error : (err) =>{
          console.log(err)
        }
      })
  }


  actualizarProducto(){
    this.productoService.actualizarProducto(this.producto.idProducto!, this.producto).subscribe({
      next: (data) =>{
        console.log("Se actualizo el producto code",data.idProducto)
        this.router.navigate(['/admin/crudProducto'])
      },
      error : (err) =>{
        console.log("error" , err)
      }
    })
  }
}
