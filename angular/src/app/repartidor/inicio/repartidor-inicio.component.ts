import { Component } from '@angular/core';

@Component({
  selector: 'app-repartidor-inicio',
  templateUrl: './repartidor-inicio.component.html',
  styleUrls: ['./repartidor-inicio.component.css']
})
export class RepartidorInicioComponent {
  fechaActual = new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  repartidor = 'Fernando';
  pedidosEntregados = 8;
  ganancias = 102.5;
  pendientes = 3;

  notificaciones = [
    'Tienes 3 pedidos nuevos pendientes de entrega',
    'Recuerda marcar como entregado cada pedido'
  ];

  ubicacion = 'Av. Los Próceres 452, San Miguel';
}
