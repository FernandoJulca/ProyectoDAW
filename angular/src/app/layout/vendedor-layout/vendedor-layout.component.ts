import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vendedor-layout',
    imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './vendedor-layout.component.html',
  styleUrl: './vendedor-layout.component.css'
})
export class VendedorLayoutComponent {

  logout() {
  
  }
}
