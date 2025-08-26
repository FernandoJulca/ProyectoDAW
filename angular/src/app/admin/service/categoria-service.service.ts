import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../shared/model/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
 private url = "http://localhost:8080/categoria"
  constructor(  private http: HttpClient) { }

  listaCategorias():Observable<Categoria[]>{
     return this.http.get<Categoria[]>(`${this.url}/listaAll`)
  }
}
