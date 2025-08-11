import { Component, OnInit } from '@angular/core';
import { DetalleVenta } from '../../shared/model/detalleVenta.model';
import { CarritoService } from '../service/carro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraService } from '../service/compra.service';
import { Venta } from '../../shared/model/venta.model';
import { Usuario } from '../../shared/model/usuario.model';
import { AlertService } from '../../util/alert.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-finalizar-compra',
  imports: [CommonModule, FormsModule],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css',
})
export class FinalizarCompraComponent implements OnInit {
  carrito: DetalleVenta[] = [];
  total: number = 0;
  metodoPago: 'efectivo' | 'tarjeta' = 'efectivo';

  meses = Array.from({ length: 12 }, (_, i) => i + 1);
  anios = Array.from({ length: 46 }, (_, i) => 2025 + i);

  tarjeta = {
    numero: '',
    mes: '',
    anio: '',
    cvv: '',
  };
  usuario: Usuario = {
    idUsuario: 2,
    nombres: 'María',
    apePaterno: 'Ramírez',
    apeMaterno: 'Lopez',
    correo: 'maria.ramirez@example.com',
    clave: 'clave123',
    nroDocumento: '23456789',
    direccion: 'Calle Real 456',
    telefono: '987654322',
    rol: {
      idRol: 2,
      descripcion: 'Cliente',
    },
    distrito: {
      idDistrito: 2,
      nombre: 'Nombre del distrito',
    },
    fechaRegistro: new Date().toISOString(),
    estado: true,
  };
  constructor(
    private carritoService: CarritoService,
    private compraService: CompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.getCarritoObservable().subscribe((items) => {
      this.carrito = items;
      this.total = this.carritoService.getTotal();
    });
  }

  aumentarCantidad(idProducto: number) {
    try {
      this.carritoService.aumentarCantidad(idProducto);
    } catch (error) {
      alert(error);
    }
  }

  disminuirCantidad(idProducto: number) {
    this.carritoService.disminuirCantidad(idProducto);
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/no-imagen.jpg';
  }
  realizarPago() {
    if (this.carrito.length === 0) {
      AlertService.info('El carrito está vacío.');
      return;
    }

    const venta: Venta = {
      idVenta: 0,
      usuario: this.usuario,
      detalles: this.carrito,
      total: this.total,
    };

    this.compraService.finalizarVenta(venta).subscribe({
      next: (response) => {
        if (response.valor) {
          AlertService.success(response.mensaje);
          this.carritoService.limpiarCarrito();

          const modalElement = document.getElementById('modalPago');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
          }

          this.total = 0;
          this.carrito = [];
        } else {
          AlertService.error(response.mensaje);
        }
        console.log('Respuesta:', response);
      },
      error: (error) => {
        console.log('error:', error);
        AlertService.error(
          'Error al procesar la compra: ' +
            (error.error || error.message || 'Intente más tarde')
        );
      },
    });
  }

  abrirModalPago() {
    const modal = new bootstrap.Modal(document.getElementById('modalPago')!);
    modal.show();
  }
  formatearNumeroTarjeta() {
    let num = this.tarjeta.numero.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = num.match(/.{1,4}/g)?.join(' ') ?? '';
    this.tarjeta.numero = formatted;
  }
  soloNumeros(event: KeyboardEvent): boolean {
  const charCode = event.charCode;
  if (charCode >= 48 && charCode <= 57) {
    return true; // números del 0 al 9
  } else {
    event.preventDefault(); // bloquea cualquier otra tecla
    return false;
  }
}
irProducto(){
this.router.navigate(['/cliente/producto']);
}
}
