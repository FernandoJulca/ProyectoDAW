import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ReporteService } from '../service/reporte.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  // FECHAS
  fechaCompleta: string = '';
  fechaCorta: string = '';

  // DATOS DEL USUARIO EN LA CARD
  correoUsuario: string = 'usuario@correo.com';
  nombreUsuario: string = 'Odetari God';
  inicialUsuario: string = 'OG';
  fotoUsuario: string | ArrayBuffer | null = null;

  // DATOS DEL MINI DASHBOARD MENSUAL
  ventasMensual: number = 0;
  prodsVendidosMensual: number = 0;
  clisAtendidosMensual: number = 0;
  ingresosMensuales: number = 0;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.obtenerFecha();
    this.generarInicial();
    this.cargarDatosMensuales();
  }

  obtenerFecha(): void {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    this.fechaCompleta = fecha.toLocaleDateString('es-ES', opciones);
    this.fechaCorta = fecha.toLocaleDateString('es-ES');
  }

  generarInicial(): void {
    if (this.nombreUsuario && this.nombreUsuario.length > 0) {
      this.inicialUsuario = this.nombreUsuario.charAt(0).toUpperCase();
    }
  }

  subirFoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoUsuario = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // Método para cargar todos los datos mensuales
  cargarDatosMensuales(): void {
    forkJoin({
      ventas: this.reporteService.obtenerTotalVentasMensual(),
      productos: this.reporteService.obtenerTotalProductosVendidosMensual(),
      clientes: this.reporteService.obtenerTotalClientesMensual(),
      ingresos: this.reporteService.obtenerIngresosTotales()
    }).subscribe({
      next: resultados => {
        this.ventasMensual = resultados.ventas;
        this.prodsVendidosMensual = resultados.productos;
        this.clisAtendidosMensual = resultados.clientes;
        this.ingresosMensuales = resultados.ingresos;
      },
      error: err => console.error('Error al cargar datos mensuales', err)
    });
  }
}

