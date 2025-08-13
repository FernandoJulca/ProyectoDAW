package com.ProyectoDAW.Ecommerce.dto;

public class ProductoSeleccionado {
	
	private Integer codProducto;
	
	private String nombre;

	private Double precio;
	
	private Integer cantidad;

	public Double getSubtotal() {
		return precio * cantidad;
	}
}
