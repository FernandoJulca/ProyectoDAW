import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkWithHref
],
  templateUrl: './admin-layout.component.html',
styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

    isReportesOpen: boolean = false;

     toggleReportes(): void {
    this.isReportesOpen = !this.isReportesOpen;
  }

  cerrarMenu(): void {
    this.isReportesOpen = false;
  }
}
