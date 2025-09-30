package com.ProyectoDAW.Ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVentaDTO {
	private Integer idDetalleVenta;
	private Integer idProducto;
    private String nombreProducto; 
    private Integer cantidad;
    private Double subTotal;
}
