import { Component, OnInit, ViewChild } from '@angular/core';

//service 
import { VentaServiceService } from '../../service/venta-service.service';
//entidad
import { VentaFiltroFechaTipoUsuario } from '../../../shared/dto/VentaFiltroFechaTipoUsuario.model';
//angular material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Categoria } from '../../../shared/model/categoria.model';

@Component({
  selector: 'app-reporte-venta',
  imports: [],
  templateUrl: './reporte-venta.component.html',
  styleUrl: './reporte-venta.component.css'
})
export class ReporteVentaComponent {

}
