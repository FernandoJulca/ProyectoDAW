import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cliente-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './cliente-layout.component.html',
  styleUrl: './cliente-layout.component.css'
})
export class ClienteLayoutComponent {

}
