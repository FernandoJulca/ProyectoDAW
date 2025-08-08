import { HttpClient } from '@angular/common/http';
import { Venta } from '../../shared/model/venta.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoResponse } from '../../shared/dto/resultadoResponse.model';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private baseUrl = 'http://localhost:8080/carro';

  constructor(private http: HttpClient) {}

  finalizarVenta(venta: Venta): Observable<ResultadoResponse> {
    return this.http.post<ResultadoResponse>(`${this.baseUrl}/finalizar`, venta);
  }
}
