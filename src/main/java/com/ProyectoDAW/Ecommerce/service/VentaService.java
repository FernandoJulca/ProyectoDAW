package com.ProyectoDAW.Ecommerce.service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.dto.ResultadoResponse;
import com.ProyectoDAW.Ecommerce.model.DetalleVenta;
import com.ProyectoDAW.Ecommerce.model.Producto;
import com.ProyectoDAW.Ecommerce.model.Venta;
import com.ProyectoDAW.Ecommerce.repository.IDetalleVentaRepository;
import com.ProyectoDAW.Ecommerce.repository.IProductoRepository;
import com.ProyectoDAW.Ecommerce.repository.IVentaRepository;

import jakarta.transaction.Transactional;

@Service
public class VentaService {
	@Autowired
	private IVentaRepository ventaRepository;

	@Autowired
	private IProductoRepository productoRepository;

	public List<Venta> getOrdenForIdUser(Integer idUsuario) {
		return ventaRepository.findByUsuarioId(idUsuario);
	}

	@Transactional
	public ResultadoResponse guardarVentaCompleta(Venta venta) {
		try {
			if (venta.getIdVenta() != null && venta.getIdVenta() == 0) {
				venta.setIdVenta(null);
			}

			venta.setFechaRegistro(LocalDateTime.now());
			venta.setTipoVenta("R");
			venta.setEstado("P");

			for (DetalleVenta detalle : venta.getDetalles()) {
				Producto producto = detalle.getProducto();
				int cantidadComprada = detalle.getCantidad();

				if (producto.getStock() < cantidadComprada) {
					return new ResultadoResponse(false, "Stock insuficiente para el producto: " + producto.getNombre());
				}

				productoRepository.actualizarStock(producto.getIdProducto(), producto.getStock() - cantidadComprada);

				detalle.setVenta(venta); 
			}

			ventaRepository.save(venta); 

			return new ResultadoResponse(true, "La venta se registró correctamente.");

		} catch (Exception ex) {
			return new ResultadoResponse(false, "Error al registrar la venta: " + ex.getMessage());
		}
	}

}
