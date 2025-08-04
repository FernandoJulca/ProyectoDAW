import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VendedorLayoutComponent } from "../layout/vendedor-layout/vendedor-layout.component";

const routes: Routes = [
  {
    path:'',
    component:VendedorLayoutComponent,
    children:[

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendedorRoutingModule {}