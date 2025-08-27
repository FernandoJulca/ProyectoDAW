import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../cliente/service/auth.service';
import { UserService } from '../../cliente/service/user.service';
import { VentaDTO } from '../../shared/dto/ventaDTO.model';
import { RepartidorService, VentaDeliveryDTO } from '../../cliente/service/repartidor.service';
import { GoogleMap, MapDirectionsRenderer, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';

// Define a new type for your marker data
interface MarkerOptions {
  position: google.maps.LatLngLiteral;
  label: string;
}

@Component({
  selector: 'app-repartidor-inicio',
  templateUrl: './repartidor-inicio.component.html',
  styleUrls: ['./repartidor-inicio.component.css'],
  imports: [GoogleMap, MapMarker, MapDirectionsRenderer, CommonModule]
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
  
  myLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // Use the new type for the markers array
  markers: MarkerOptions[] = [];

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosRepartidor();
    this.cargarPedidos();

    const statePedido = history.state.pedido as VentaDeliveryDTO | undefined;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.myLocation = { 
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.center = this.myLocation; 
          
          this.markers.push({ position: this.myLocation, label: 'Yo' });

          if (statePedido) {
            this.pedidoSeleccionado = statePedido;
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
    if (!pedido?.latitud || !pedido?.longitud) return;

    this.center = { lat: pedido.latitud, lng: pedido.longitud };

    // Clear existing markers to show only the new ones
    this.markers = [];
    
    // Add markers for both your location and the customer's location
    this.markers.push({ position: this.myLocation, label: 'Yo' });
    this.markers.push({
      position: { lat: pedido.latitud, lng: pedido.longitud },
      label: 'Pedido'
    });

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: this.myLocation,
        destination: { lat: pedido.latitud, lng: pedido.longitud },
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result) {
          this.directions = result;
        } else {
          console.error('Error mostrando ruta:', status);
          this.directions = null;
        }
      }
    );
  }
}