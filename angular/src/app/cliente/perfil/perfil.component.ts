import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../service/perfil.service';
import { Venta } from '../../shared/model/venta.model';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../shared/model/usuario.model';
import { VentaDTO } from '../../shared/dto/ventaDTO.model';
import { UsuarioDTO } from '../../shared/dto/usuarioDTO.model';
import { CompraService } from '../service/compra.service';
import { saveAs } from 'file-saver'; 

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: UsuarioDTO | null = null; // <-- Aquí declaras 'usuario'
  ventas: VentaDTO[] = [];

  constructor(private perfilService: PerfilService, private compraService: CompraService) {}

  ngOnInit(): void {
    const idUsuario = 2;
    this.perfilService.getPerfilCliente(idUsuario).subscribe({
      next: (data: VentaDTO[]) => {
        this.ventas = data;
        if (data.length > 0) {
          this.usuario = data[0].usuario; // asignas usuario para usar en template
        }
      },
      error: (err) => {
        console.error('Error obteniendo ventas:', err);
      }
    });
  }
  descargarPDF(ventaId: number): void {
  const clienteId = this.usuario?.idUsuario;
  if (!clienteId) return;

  this.compraService.descargarComprobante(clienteId, ventaId).subscribe({
    next: (data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, `venta_${ventaId}.pdf`);
    },
    error: (err) => {
      console.error('Error al descargar PDF:', err);
    }
  });
}
}
