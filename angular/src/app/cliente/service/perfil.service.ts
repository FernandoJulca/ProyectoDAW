import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../../shared/model/venta.model';
import { VentaDTO } from '../../shared/dto/ventaDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private baseUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) {}

  getPerfilCliente(idUsuario: number): Observable<VentaDTO[]> {
    return this.http.get<VentaDTO[]>(`${this.baseUrl}/perfil?idUsuario=${idUsuario}`);
  }
}