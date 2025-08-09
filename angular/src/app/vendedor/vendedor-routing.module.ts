import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VendedorLayoutComponent } from "../layout/vendedor-layout/vendedor-layout.component";
import { InicioComponent } from "./inicio/inicio.component";
import { VentasComponent } from "./ventas/ventas.component";
import { HistorialComponent } from "./historial/historial.component";

const routes: Routes = [
  {
    path: 'vendedor',
    component: VendedorLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'ventas',
        component: VentasComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendedorRoutingModule {}