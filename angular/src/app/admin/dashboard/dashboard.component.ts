import { Component } from '@angular/core';
import { ComponenteUnoComponent } from '../graficosComponentes/componente-uno/componente-uno.component';
import { ComponenteDosComponent } from '../graficosComponentes/componente-dos/componente-dos.component';
import { ComponenteTresComponent } from '../graficosComponentes/componente-tres/componente-tres.component';

@Component({
  selector: 'app-dashboard',
  standalone : true,
  imports: [
    ComponenteUnoComponent,
    ComponenteDosComponent,
  ComponenteTresComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
