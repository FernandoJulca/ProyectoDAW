package com.ProyectoDAW.Ecommerce.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VentaDeliveryDTO {
	private Integer idUsuario;
    private BigDecimal total;
    private String direccionEntrega;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private List<DetalleVentaDTO> detalles; // lista de productos con cantidad
    private Integer idRepartidor;
}
