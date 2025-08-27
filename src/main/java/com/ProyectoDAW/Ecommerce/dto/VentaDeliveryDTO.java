package com.ProyectoDAW.Ecommerce.dto;

import java.math.BigDecimal;
import java.util.List;

import com.ProyectoDAW.Ecommerce.model.Usuario;

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
    private Usuario usuario;
    private BigDecimal total;
    private String direccionEntrega;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private List<DetalleVentaDTO> detalles;
    private Integer idRepartidor;
    private String tipoVenta;
}

