import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../cliente/service/auth.service';
import { UserService } from '../../cliente/service/user.service';
import { VentaDTO } from '../../shared/dto/ventaDTO.model';
import { RepartidorService } from '../../cliente/service/repartidor.service';

@Component({
  selector: 'app-repartidor-inicio',
  templateUrl: './repartidor-inicio.component.html',
  styleUrls: ['./repartidor-inicio.component.css']
})
export class RepartidorInicioComponent implements OnInit {
  repartidor: string = '';
  ubicacion: string = '';
  pedidos: VentaDTO[] = [];
  cargando: boolean = false;
  fechaActual: string = new Date().toLocaleDateString('es-PE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cargarDatosRepartidor();
    this.cargarPedidos();
  }

  cargarDatosRepartidor(): void {
    const user = this.userService.getUser();
    if (user) {
      this.repartidor = `${user.nombres} ${user.apePaterno}`;
      this.ubicacion = user.direccion || 'Ubicación no registrada';
    } else {
      this.repartidor = 'Invitado';
      this.ubicacion = '';
    }
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.repartidorService.obtenerPedidosDeliveryPendientes().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.cargando = false;
      }
    });
  }
}