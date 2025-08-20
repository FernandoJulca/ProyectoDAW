import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ReporteService } from '../service/reporte.service';
import { forkJoin } from 'rxjs';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { VentasChartResponse } from '../../shared/dto/ventasChartResponse.model';

Chart.register(...registerables);

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
export class InicioComponent implements OnInit, OnDestroy {

  // Referencia al canvas del gráfico
  @ViewChild('ventasChart', { static: false }) ventasChart!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

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

  // ESTADO DE CARGA PARA DATOS GENERALES
  cargandoDatos: boolean = false;
  errorCarga: string | null = null;

  // ESTADO DE CARGA ESPECÍFICO PARA EL GRÁFICO
  cargandoGrafico: boolean = false;
  errorGrafico: string | null = null;

  // DATOS ADICIONALES DEL GRÁFICO
  totalVentasGrafico: number = 0;
  promedioVentasGrafico: number = 0;
  fechaUltimaActualizacion: Date = new Date();

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.obtenerFecha();
    this.generarInicial();
    this.cargarDatosMensuales();
    // El gráfico se carga después de que la vista esté lista
    setTimeout(() => {
      this.cargarGraficoVentas();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
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

  cargarDatosMensuales(): void {
    this.cargandoDatos = true;

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
        this.cargandoDatos = false;
      },
      error: err => {
        console.error('Error al cargar datos mensuales', err);
        this.errorCarga = 'Error al cargar los datos mensuales';
        this.cargandoDatos = false;
      }
    });
  }

  // Método para cargar y crear el gráfico de ventas mensuales
  cargarGraficoVentas(): void {
    this.cargandoGrafico = true;
    this.errorGrafico = null;

    this.reporteService.getVentasMensuales().subscribe({
      next: (response: VentasChartResponse) => {
        if (response.valor && response.data) {
          this.crearGrafico(response.data);
          this.calcularEstadisticasGrafico(response.data);
          this.fechaUltimaActualizacion = new Date();
        } else {
          console.error('Error en la respuesta:', response.mensaje);
          this.errorGrafico = response.mensaje;
        }
        this.cargandoGrafico = false;
      },
      error: (err) => {
        console.error('Error al cargar gráfico de ventas:', err);
        this.errorGrafico = 'No se pudieron cargar las estadísticas';
        this.cargandoGrafico = false;
      }
    });
  }

  // Método para crear el gráfico optimizado para el contenedor Bootstrap
  private crearGrafico(data: any): void {
    if (!this.ventasChart) {
      console.error('Canvas no encontrado');
      return;
    }

    const ctx = this.ventasChart.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas');
      return;
    }

    // Destruir gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset: any) => ({
          ...dataset,
          // Ajustar estilos para el contenedor pequeño
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: { size: 11 },
              maxTicksLimit: 6
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              font: { size: 10 },
              maxRotation: 45
            }
          }
        },
        plugins: {
          title: {
            display: false // Quitamos el título porque ya lo tenemos en el card
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { size: 11 },
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 12 },
            bodyFont: { size: 11 },
            cornerRadius: 6,
            displayColors: true
          }
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5
          },
          line: {
            borderWidth: 2
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private calcularEstadisticasGrafico(data: any): void {
    if (data.datasets && data.datasets.length > 0) {
      const ventasData = data.datasets[0].data;

      this.totalVentasGrafico = ventasData.reduce((sum: number, val: number) => sum + val, 0);
      this.promedioVentasGrafico = this.totalVentasGrafico / ventasData.length;
    }
  }

  recargarGrafico(): void {
    this.cargarGraficoVentas();
  }

  recargarDatos(): void {
    this.errorCarga = null;
    this.cargarDatosMensuales();
    this.recargarGrafico();
  }
}