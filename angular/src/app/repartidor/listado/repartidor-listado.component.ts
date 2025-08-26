import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado',
  templateUrl: './repartidor-listado.component.html',
  styleUrls: ['./repartidor-listado.component.css'],
  imports :[CommonModule]
})
export class RepartidorListadoComponent {
  pedidos = [
    {
      id: 1,
      cliente: 'Juan Pérez',
      direccion: 'Av. Los Olivos 123',
      precio: 48.90,
      tipoPago: 'Yape'
    },
    {
      id: 2,
      cliente: 'María López',
      direccion: 'Calle 12, Mz B, Lt 4',
      precio: 32.00,
      tipoPago: 'Efectivo'
    }
  ];

  pedidoSeleccionado: any = null;

    ngOnInit(): void {
    console.log('Pedidos cargados:', this.pedidos);
  }

  verDetalle(pedido: any) {
    console.log('Ver detalle de pedido:', pedido);
    this.pedidoSeleccionado = pedido;
  }

  cerrarDetalle() {
    this.pedidoSeleccionado = null;
  }

  confirmarEntrega() {
    alert('Entrega confirmada.');
    this.cerrarDetalle();
  }
}
