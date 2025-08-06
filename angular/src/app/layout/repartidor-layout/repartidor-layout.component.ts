import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-repartidor-layout',
    imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './repartidor-layout.component.html',
  styleUrl: './repartidor-layout.component.css'
})
export class RepartidorLayoutComponent {
constructor(private router: Router) {}

  cerrarSesion() {
    // Aquí iría la lógica real de cerrar sesión (token, backend, etc.)
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}
