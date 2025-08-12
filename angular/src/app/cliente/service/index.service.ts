import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexResponse } from '../../shared/dto/categoriaVentas.model';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private baseClienteUrl = 'http://localhost:8080/cliente';
  private indexPath = 'index';

  constructor(private http: HttpClient) {}

  getIndexData(): Observable<IndexResponse> {
    const url = `${this.baseClienteUrl}/${this.indexPath}`;
    return this.http.get<IndexResponse>(url);
  }
}
