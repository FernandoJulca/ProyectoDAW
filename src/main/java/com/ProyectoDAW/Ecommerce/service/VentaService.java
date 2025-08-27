package com.ProyectoDAW.Ecommerce.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.dto.DetalleVentaDTO;
import com.ProyectoDAW.Ecommerce.dto.ResultadoResponse;
import com.ProyectoDAW.Ecommerce.dto.UsuarioDTO;
import com.ProyectoDAW.Ecommerce.dto.VentaDTO;
import com.ProyectoDAW.Ecommerce.dto.VentaFiltroFechaTipoUsuario;
import com.ProyectoDAW.Ecommerce.model.DetalleVenta;
import com.ProyectoDAW.Ecommerce.model.Producto;
import com.ProyectoDAW.Ecommerce.model.Venta;
import com.ProyectoDAW.Ecommerce.repository.IProductoRepository;
import com.ProyectoDAW.Ecommerce.repository.IVentaRepository;

import jakarta.transaction.Transactional;

@Service
public class VentaService {
	@Autowired
	private IVentaRepository ventaRepository;

	@Autowired
	private IProductoRepository productoRepository;

	public List<VentaDTO> getVentasPorUsuario(Integer idUsuario) {
		List<Venta> ventas = ventaRepository.findByUsuarioId(idUsuario);
		return ventas.stream().map(this::mapVentaToDTO).collect(Collectors.toList());
	}

	public List<Venta> getVentaForIdUser(Integer idUsuario) {
		return ventaRepository.findByUsuarioId(idUsuario);
	}

	@Transactional
	public ResultadoResponse guardarVentaCompleta(Venta venta) {
		try {
			if (venta.getIdVenta() != null && venta.getIdVenta() == 0) {
				venta.setIdVenta(null);
			}

			venta.setFechaRegistro(LocalDateTime.now());
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

	public Venta obtenerVentaPorUsuario(Integer idVenta, Integer idUsuario) {
		Optional<Venta> ventaOpt = ventaRepository.findById(idVenta);
		return ventaOpt.filter(v -> v.getUsuario().getIdUsuario().equals(idUsuario)).orElse(null);
	}

	/* Mapper conviertiendo la entidad venta al dto */
	private VentaDTO mapVentaToDTO(Venta venta) {
		VentaDTO dto = new VentaDTO();
		dto.setIdVenta(venta.getIdVenta());

		UsuarioDTO usuarioDto = new UsuarioDTO();
		usuarioDto.setIdUsuario(venta.getUsuario().getIdUsuario());
		usuarioDto.setNombres(venta.getUsuario().getNombres());
		usuarioDto.setCorreo(venta.getUsuario().getCorreo());
		dto.setUsuario(usuarioDto);

		dto.setFechaRegistro(venta.getFechaRegistro());
		dto.setTotal(venta.getTotal());
		dto.setEstado(venta.getEstado());
		dto.setTipoVenta(venta.getTipoVenta());

		List<DetalleVentaDTO> detallesDto = venta.getDetalles().stream().map(det -> {
			DetalleVentaDTO detalleDto = new DetalleVentaDTO();
			detalleDto.setIdDetalleVenta(det.getIdDetalleVenta());
			detalleDto.setNombreProducto(det.getProducto().getNombre());
			detalleDto.setCantidad(det.getCantidad());
			detalleDto.setSubTotal(det.getSubTotal());
			return detalleDto;
		}).collect(Collectors.toList());

		dto.setDetalles(detallesDto);

		return dto;
	}

	@Transactional
	public ResultadoResponse guardarVenta(Venta venta) {
		try {
			if (venta.getIdVenta() != null && venta.getIdVenta() == 0) {
				venta.setIdVenta(null);
			}

			venta.setFechaRegistro(LocalDateTime.now());
			venta.setTipoVenta("P");
			venta.setEstado("G");

			for (DetalleVenta detalle : venta.getDetalles()) {
				
				Producto producto = productoRepository.findById(detalle.getProducto().getIdProducto())
						.orElseThrow(() -> new RuntimeException(
								"Producto no encontrado con ID: " + detalle.getProducto().getIdProducto()));

				int cantidadComprada = detalle.getCantidad();

				if (producto.getStock() < cantidadComprada) {
					return new ResultadoResponse(false, "Stock insuficiente para el producto: " + producto.getNombre());
				}

				productoRepository.actualizarStock(producto.getIdProducto(), producto.getStock() - cantidadComprada);

				detalle.setProducto(producto);
				detalle.setVenta(venta);
			}

			ventaRepository.save(venta);

			return new ResultadoResponse(true, "La venta se registró correctamente.");

		} catch (Exception ex) {
			return new ResultadoResponse(false, "Error al registrar la venta: " + ex.getMessage());
		}
	}

	// Vista-Inicio-Vendedor
	private String obtenerMesActual() {
		LocalDate fechaActual = LocalDate.now();
		DateTimeFormatter formatoMes = DateTimeFormatter.ofPattern("yyyy-MM");
		return fechaActual.format(formatoMes);
	}

	public Long obtenerTotalVentasMensual() {
		String fechaMes = obtenerMesActual();
		return ventaRepository.contarVentasPorMes(fechaMes);
	}

	public Long obtenerTotalProductosVendidosMensual() {
		String fechaMes = obtenerMesActual();
		return ventaRepository.contarProductosVendidosPorMes(fechaMes);
	}

	public Long obtenerTotalClientesAtendidosMensual() {
		String fechaMes = obtenerMesActual();
		return ventaRepository.contarClientesAtendidosPorMes(fechaMes);
	}

	// Vista-Historial-vendedor
	public Long obtenerTotalVentas() {
		return ventaRepository.obtenerTotalVentas();
	}

	public Long obtenerTotalProductosVendidos() {
		return ventaRepository.obtenerTotalProductosVendidos();
	}

	public Double obtenerIngresosTotales() {
		return ventaRepository.obtenerIngresosTotales();
	}

	
	public List<VentaFiltroFechaTipoUsuario> ListadoVentaFechaAndTipoVenta(LocalDate fechaInicio, LocalDate fechaFin, String tipoVenta){
		return ventaRepository.ListadoVentaFechaAndTipoVenta(fechaInicio, fechaFin, tipoVenta);
	}
	
	public List<VentaFiltroFechaTipoUsuario>ListadoVentaFechaAndTipoVentaNull(){
		return ventaRepository.ListadoVentaFechaAndTipoVentaNull();
	}
	
	// LISTADOS PARA LOS GRAFICOS
	public List<Object[]> listadoVentaPorMes(){
		return ventaRepository.listadoVentaPorMes();
	}
	
	public List<Object[]>listadoDeTipoDeVentasPorMes(){
		return ventaRepository.listadoDeTipoDeVentasPorMes();
	}
	
	public List<Object[]>listadoDeDistroPorVentas(){
		return ventaRepository.listaVentaPorDistrito();
	}
	
}
