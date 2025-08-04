import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RepartidorLayoutComponent } from "../layout/repartidor-layout/repartidor-layout.component";

const routes: Routes = [
{
  path:'',
  component:RepartidorLayoutComponent,
  children:[

  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidorRoutingModule {}