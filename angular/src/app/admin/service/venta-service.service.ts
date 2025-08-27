import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaFiltroFechaTipoUsuario } from '../../../app/shared/dto/VentaFiltroFechaTipoUsuario.model';
import { VentaPorFechasDTO } from '../../shared/dto/VentaPorFechasDTO.model';
import { VentaPorTipoVentaMesDTO } from '../../shared/dto/ventaPorTipoVentaMesDTO.model';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {
private url = "http://localhost:8080/venta"
  constructor(
      private http: HttpClient
  ) { }


  ListadoVentaFechaAndTipoVenta(
    fechaInicio:string | null,
    fechaFin:string | null,
    tipoVenta?:string):Observable<VentaFiltroFechaTipoUsuario[]>
  {
    let urlBase =  `${this.url}/filtradoVentas`
    if(fechaInicio!=null && fechaFin!=null){
      
      urlBase+=`/${fechaInicio}&${fechaFin}`;
    }
    if(tipoVenta){
    urlBase+=`?tipoVenta=${tipoVenta}`
    }
    return this.http.get<VentaFiltroFechaTipoUsuario[]>(urlBase);
  }
  
//listado para LOS GRAFICOS
  listadoDeVentasPorMes():Observable<VentaPorFechasDTO[]>{
    return this.http.get<VentaPorFechasDTO[]>(`${this.url}/ListaMes`)
  } 

  listadoVentaPorTipoVentaMes():Observable<VentaPorTipoVentaMesDTO[]>{
    return this.http.get<VentaPorTipoVentaMesDTO[]>(`${this.url}/listoVentaTipo`)
  }
}
