import { Component, OnInit, ViewChild } from '@angular/core';


//service
import { ProductoServiceService } from '../../service/producto-service.service';
import { CategoriaServiceService } from '../../service/categoria-service.service';
//formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//entidad
import { Producto } from '../../../shared/model/producto.model';
//angular material

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Categoria } from '../../../shared/model/categoria.model';


@Component({
  selector: 'app-reporte-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './reporte-stock.component.html',
  styleUrls: ['./reporte-stock.component.css']
})
export class ReporteStockComponent implements OnInit {

  dataSource = new MatTableDataSource<Producto>([]);
  columnas: string[] = ['idProducto', 'nombre', 'descripcion', 'proveedor', 'categoria', 'precio', 'stock', 'fechaRegistrado'];

  //definimos la lista categoria
  categoria: Categoria[] = []
  categoriaSeleccionada!: number | null
  orden: string = "ASC" //por defecto ascendente

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productoService: ProductoServiceService,
    private categoriaService: CategoriaServiceService
  ) { }

  ngOnInit(): void {
    this.cargarCategoria();
    this.filtrarProductos();
  }

  cargarCategoria(): void {
    this.categoriaService.listaCategorias().subscribe({
      next: (data) => {
        this.categoria = data
        console.log("categorias cargadas: ", data)
      },
      error: (err) => {
        console.log("Error: ", err)
      }
    })
  }

  onChangeCategoria(cateSelect:number|null):void{
    this.categoriaSeleccionada = cateSelect;
    console.log("Seleccionando: " ,cateSelect );
    this.filtrarProductos();
  }

  onChangeOrden():void{
    console.log("Seleccionando Orden: ", this.orden)
    this.filtrarProductos();
  }


  filtrarProductos(): void {
    const categoriaId = this.categoriaSeleccionada || 0;
    
    this.productoService.listarProductoPorCategoria(categoriaId,this.orden).subscribe({
      next : (data) =>{
        this.actualizarTabla(data);
         console.log("Filtrando por categoria", categoriaId, " orden: " ,this.orden)
      },
      error: (err) => console.error('Error obteniendo productos', err)
    })
    }

  actualizarTabla(productos: Producto[]): void {
    this.dataSource = new MatTableDataSource(productos);
    this.dataSource.paginator = this.paginator;
  }

}
