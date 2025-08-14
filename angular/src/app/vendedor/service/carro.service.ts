import { Injectable } from '@angular/core';
import { DetalleVenta } from '../../shared/model/detalleVenta.model';
import { Producto } from '../../shared/model/producto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResultadoResponse } from '../../shared/dto/resultadoResponse.model';
import { Venta } from '../../shared/model/venta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  
  private baseUrl = 'http://localhost:8080/vendedor';
  private carrito: DetalleVenta[] = [];

  constructor(private http: HttpClient) {}

  /** ------------------- LÓGICA DE CARRITO ------------------- **/

  agregarProducto(producto: Producto, cantidad: number) {
    const existente = this.carrito.find(d => d.producto.idProducto === producto.idProducto);

    if (existente) {
      existente.cantidad += cantidad;
      existente.subTotal = existente.cantidad * existente.producto.precio;
    } else {
      this.carrito.push({
        producto,
        cantidad,
        subTotal: cantidad * producto.precio
      });
    }
  }

  quitarProducto(idProducto: number) {
    this.carrito = this.carrito.filter(d => d.producto.idProducto !== idProducto);
  }

  obtenerCarrito(): DetalleVenta[] {
    return [...this.carrito];
  }

  limpiarCarrito() {
    this.carrito = [];
  }

  calcularTotal(): number {
    return this.carrito.reduce((acc, d) => acc + d.subTotal, 0);
  }

  /** ------------------- CONSUMO API ------------------- **/

  listarProductosActivos(): Observable<Producto[]> {
    // GET /vendedor/productos
    return this.http.get<Producto[]>(`${this.baseUrl}/productos`);
  }

  finalizarVenta(usuarioId: number): Observable<ResultadoResponse> {
    const venta: Venta = {
      idVenta: 0,
      usuario: { idUsuario: usuarioId } as any,
      total: this.calcularTotal(),
      detalles: this.obtenerCarrito()
    };

    // POST /vendedor/grilla
    return this.http.post<ResultadoResponse>(`${this.baseUrl}/grilla`, venta);
  }

  obtenerVentasPorUsuario(idUsuario: number): Observable<Venta[]> {
    const params = new HttpParams().set('idUsuario', idUsuario.toString());
    // GET /vendedor/ventas?idUsuario=...
    return this.http.get<Venta[]>(`${this.baseUrl}/ventas`, { params });
  }
}
