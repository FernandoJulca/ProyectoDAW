import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import {  Router, RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { DetalleVenta } from '../../shared/model/detalleVenta.model';
import { CarritoService } from '../../cliente/service/carro.service';
declare var bootstrap: any;

@Component({
  selector: 'app-cliente-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive,
  ],
  templateUrl: './cliente-layout.component.html',
  styleUrls: ['./cliente-layout.component.css'] // corregí aquí (styleUrls)
})
export class ClienteLayoutComponent implements OnInit {
  carrito: DetalleVenta[] = [];
  total: number = 0;

  constructor(private route: Router,private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.getCarritoObservable().subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.getTotal();
    });
  }

  calcularTotal(): number {
    return this.total;
  }

  eliminarProducto(idProducto: number) {
    this.carritoService.eliminarProducto(idProducto);
  }

  aumentarCantidad(idProducto: number) {
    try {
      this.carritoService.aumentarCantidad(idProducto);
    } catch (e: any) {
      alert(e.message);
    }
  }

  disminuirCantidad(idProducto: number) {
    try {
      this.carritoService.disminuirCantidad(idProducto);
    } catch (e: any) {
      alert(e.message);
    }
  }

  logout() {
    // tu lógica para cerrar sesión
  }
  finalizarCompra() {
  const offcanvasElement = document.getElementById('offcanvasCarrito');
  if (offcanvasElement) {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance?.hide(); // Cierra el panel
  }

    this.route.navigate(['/cliente/finalizarCompra']);
}


  onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/no-imagen.jpg'; 
}
getCantidadTotal(): number {
  return this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

}
