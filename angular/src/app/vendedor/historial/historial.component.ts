import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ReporteService } from '../service/reporte.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  totalVentas: number = 0;
  totalProductosVendidos: number = 0;
  ingresosTotales: number = 0;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarDatosTotales();
  }

  cargarDatosTotales(): void {
    forkJoin({
      ventas: this.reporteService.obtenerTotalVentas(),
      productos: this.reporteService.obtenerTotalProductosVendidos(),
      ingresos: this.reporteService.obtenerIngresosTotales()
    }).subscribe({
      next: resultados => {
        this.totalVentas = resultados.ventas;
        this.totalProductosVendidos = resultados.productos;
        this.ingresosTotales = resultados.ingresos;
      },
      error: err => console.error('Error al cargar datos totales', err)
    });
  }

}
