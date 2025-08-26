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
import { AuthService } from '../service/auth.service';
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
  metodoPago: 'P' | 'R' = 'P';

  meses = Array.from({ length: 12 }, (_, i) => i + 1);
  anios = Array.from({ length: 46 }, (_, i) => 2025 + i);

  tarjeta = {
    numero: '',
    mes: '',
    anio: '',
    cvv: '',
  };
  usuario!: Usuario;

  constructor(
    private carritoService: CarritoService,
    private compraService: CompraService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carritoService.getCarritoObservable().subscribe((items) => {
      this.carrito = items;
      this.total = this.carritoService.getTotal();
    });

    // Fetch user data when the component initializes, but only if they are logged in.
    if (this.authService.isLoggedIn()) {
      this.authService.getUsuario().subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (error) => {
          console.error('Error al cargar datos de usuario:', error);
          AlertService.error('Tus datos de usuario no están completos. Intenta recargar la página.');
          // Optionally, log out the user if the token is invalid
          this.authService.logout();
        }
      });
    }
  }

  aumentarCantidad(idProducto: number) {
    try {
      this.carritoService.aumentarCantidad(idProducto);
    } catch (error) {
      // Change alert to a proper AlertService call
      AlertService.error(String(error));
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
    console.log('Método de pago actual:', this.metodoPago);
    if (this.carrito.length === 0) {
      AlertService.info('El carrito está vacío.');
      return;
    }

    const venta: Venta = {
      idVenta: 0,
      usuario: this.usuario,
      detalles: this.carrito,
      total: this.total,
      tipoVenta: this.metodoPago,
    };
    console.log('Venta a enviar:', venta);
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

  // En tu FinalizarCompraComponent
abrirModalPago() {
  // Correctly call the function to get its boolean result
  const isLoggedIn = this.authService.isLoggedIn();
  console.log('User is logged in:', isLoggedIn);

  if (isLoggedIn) {
    // If the user is logged in, check if their data is available
    if (this.usuario && this.usuario.nombres) {
      const modal = new bootstrap.Modal(document.getElementById('modalPago')!);
      modal.show();
    } else {
      // If user data is missing, show an alert
      AlertService.error('Tus datos de usuario no están completos. Intenta recargar la página.');
    }
  } else {
    // If the user is NOT logged in, perform the redirection
    console.log('User is not logged in. Redirecting to login page...');
    this.router.navigate(['/login'], { queryParams: { message: 'login_required' } });
  }
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
  irProducto() {
    this.router.navigate(['/cliente/producto']);
  }
}