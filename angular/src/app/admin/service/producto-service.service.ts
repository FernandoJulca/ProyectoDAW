import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private url = "http://localhost:8080/producto"
  constructor(
    private http: HttpClient
  ) { }

  listarProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/index`)
  }

  createProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(`${this.url}/registrar`,producto)
  }

  detalleProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/obtenerId/${id}`)
  }

  actualizarProducto(id:number, producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.url}/actualizar/${id}`,producto)
  }

  desactivarProducto(id:number):Observable<string>{
     return this.http.put(`${this.url}/desactivar/${id}`, {}, { responseType: 'text' }) as Observable<string>;

  }   
}
