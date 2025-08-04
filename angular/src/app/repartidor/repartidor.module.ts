import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RepartidorRoutingModule } from "./repartidor-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RepartidorRoutingModule
  ]
})

export class RepartidorModule {}