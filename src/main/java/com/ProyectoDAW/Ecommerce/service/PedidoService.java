package com.ProyectoDAW.Ecommerce.service;

import com.ProyectoDAW.Ecommerce.dto.DetalleVentaDTO;
import com.ProyectoDAW.Ecommerce.dto.PedidoDTO;
import com.ProyectoDAW.Ecommerce.model.Venta;
import com.ProyectoDAW.Ecommerce.repository.IPedidoRepository;
import com.ProyectoDAW.Ecommerce.repository.IVentaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    IPedidoRepository pedidoRepository;

    @Autowired
    IVentaRepository ventaRepository;

    @Transactional
    public List<PedidoDTO> obtenerPedidosDeliveryPendientes() {
        List<PedidoDTO> ventas = pedidoRepository.findAll(); // solo delivery pendientes

        return ventas.stream().map(venta -> {
            PedidoDTO dto = new PedidoDTO();
            dto.setIdVenta(venta.getIdVenta());
            dto.setIdUsuario(venta.getUsuario().getIdUsuario());
            dto.setUsuario(venta.getUsuario());
            dto.setTotal(BigDecimal.valueOf(venta.getTotal()));
            dto.setDireccionEntrega(venta.getDireccionEntrega());
            dto.setLatitud(venta.getLatitud());
            dto.setLongitud(venta.getLongitud());
            dto.setIdRepartidor(null);
            dto.setTipoVenta(venta.getTipoVenta()); // asignamos el tipo
            dto.setDetalles(venta.getDetalles().stream().map(det -> {
                DetalleVentaDTO detDTO = new DetalleVentaDTO();
                detDTO.setIdProducto(det.getProducto().getIdProducto());
                detDTO.setNombreProducto(det.getProducto().getNombre());
                detDTO.setCantidad(det.getCantidad());
                detDTO.setSubTotal(det.getSubTotal());
                return detDTO;
            }).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }



    /*
     * @Transactional public ResultadoResponse actualizarEstado(Integer idVenta,
     * String estado) { Venta venta = ventaRepository.findById(idVenta)
     * .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
     * venta.setEstado(estado); ventaRepository.save(venta); return new
     * ResultadoResponse(true, "Estado actualizado"); }
     */
}
