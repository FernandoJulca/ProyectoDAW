import { Component } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { Venta } from '../../shared/model/venta.model';
import { Producto } from '../../shared/model/producto.model';


@Component({
  selector: 'app-ventas',
  imports: [],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  constructor(private carroService: CarroService) { }

  agregarAlCarrito(producto: Producto) {
    this.carroService.agregarProducto(producto, 1);
  }

  comprar() {
    this.carroService.finalizarVenta(1).subscribe({
      next: resp => {
        console.log('Venta realizada:', resp);
        this.carroService.limpiarCarrito();
      },
      error: err => console.error('Error en venta', err)
    });
  }
}
