import { Component, OnInit, ViewChild } from '@angular/core';

//service 
import { VentaServiceService } from '../../service/venta-service.service';
//formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//entidad
import { VentaFiltroFechaTipoUsuario } from '../../../shared/dto/VentaFiltroFechaTipoUsuario.model';
//angular material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-reporte-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './reporte-venta.component.html',
  styleUrl: './reporte-venta.component.css'
})
export class ReporteVentaComponent implements OnInit {

  dataSource = new MatTableDataSource<VentaFiltroFechaTipoUsuario>([]);
  columnas: string[] = ['idVenta', 'nombresCompletos', 'direccionUser', 'total', 'estado', 'tipoVenta', 'fecha'];


  fechaInicio: string | null= "";
  fechaFin: string | null = "";
  tipoVenta: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ventaService: VentaServiceService,
  ) { }


  ngOnInit(): void {
    this.filtrarProductos();
  }

  onChangeFechas(): void {
    console.log("-----FECHAS RECIBIDAS DE LA VISTA------")
    console.log("Fecha inicio: ", this.fechaInicio, " fecha fin: ", this.fechaFin)
    if (this.fechaInicio && this.fechaFin) {
      this.filtrarProductos();
    }
  }

  onChangeTipoVenta(): void {
    console.log("Tipo de venta seleccionado", this.tipoVenta)
    this.filtrarProductos();
  }



  filtrarProductos(): void {
    console.log("FILTRANDO POR FECHA: ", this.fechaInicio, "&", this.fechaFin, "VENTA SELECCIONADA", this.tipoVenta)
   
    
    this.ventaService
      .ListadoVentaFechaAndTipoVenta
      (this.fechaInicio,
       this.fechaFin,
      this.tipoVenta??"").subscribe({
         next : (data) =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
         },
         error  :(err) =>{
          console.log("ERROR PAPI NO SE PUEDE P: ", err)
         }  
        })
  }
}
