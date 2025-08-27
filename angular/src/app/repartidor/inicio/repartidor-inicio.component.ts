import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../cliente/service/auth.service';
import { UserService } from '../../cliente/service/user.service';
import { VentaDTO } from '../../shared/dto/ventaDTO.model';
import { RepartidorService, VentaDeliveryDTO } from '../../cliente/service/repartidor.service';
import { GoogleMap, MapDirectionsRenderer, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';



@Component({
  selector: 'app-repartidor-inicio',
  templateUrl: './repartidor-inicio.component.html',
  styleUrls: ['./repartidor-inicio.component.css'],
  imports: [GoogleMap, MapMarker, MapDirectionsRenderer]
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

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 15;
  pedidoSeleccionado?: VentaDeliveryDTO;
  directions: google.maps.DirectionsResult | null = null;

  markers: google.maps.MarkerOptions[] = [];

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosRepartidor();
    this.cargarPedidos();

    // Capturamos el pedido enviado por el router
    const statePedido = history.state.pedido as VentaDeliveryDTO | undefined;
    if (statePedido) {
      this.pedidoSeleccionado = statePedido;
    }

    // Obtener ubicación del repartidor
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Marcador del repartidor
          this.markers.push({ position: this.center, label: 'Yo' });

          // Mostrar ruta si hay pedido seleccionado
          if (this.pedidoSeleccionado) {
            this.mostrarRuta(this.pedidoSeleccionado);
          }
        },
        error => console.error('Error obteniendo ubicación', error)
      );
    }
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
      next: data => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar pedidos:', err);
        this.cargando = false;
      }
    });
  }

  verDetalle(pedido: VentaDTO) {
    this.router.navigate(['/repartidor/inicio'], { state: { pedido } });
  }

  mostrarRuta(pedido: VentaDeliveryDTO) {
    // Aseguramos que lat/lng existan
    if (!pedido?.latitud || !pedido?.longitud) return;

    // Marcador del pedido
    this.markers.push({
      position: { lat: pedido.latitud, lng: pedido.longitud },
      label: 'Pedido'
    });

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
  {
    origin: this.center,
    destination: { lat: pedido.latitud, lng: pedido.longitud },
    travelMode: google.maps.TravelMode.DRIVING
  },
  (result, status) => {
    if (status === 'OK' && result) {
      this.directions = result;
    } else {
      console.error('Error mostrando ruta:', status);
      this.directions = null; // evita problemas con el template
    }
  }
);
  }}