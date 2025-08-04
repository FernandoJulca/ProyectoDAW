import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteLayoutComponent } from "../layout/cliente-layout/cliente-layout.component";

const routes: Routes = [
{
      path: '',
      component: ClienteLayoutComponent,
      children:[

      ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}