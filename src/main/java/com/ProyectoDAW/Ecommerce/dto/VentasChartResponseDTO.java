package com.ProyectoDAW.Ecommerce.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VentasChartResponseDTO extends ResultadoResponse{
	private VentasChartDTO data;
	    
	    // Constructor para respuesta exitosa
	    public VentasChartResponseDTO(VentasChartDTO data, String mensaje) {
	        super(true, mensaje);
	        this.data = data;
	    }
	    
	    // Constructor para respuesta de error
	    public VentasChartResponseDTO(String mensajeError) {
	        super(false, mensajeError);
	        this.data = null;
	    }
	    
	    // Métodos estáticos para facilitar la creación
	    public static VentasChartResponseDTO success(VentasChartDTO data) {
	        return new VentasChartResponseDTO(data, "Datos de ventas mensuales obtenidos correctamente");
	    }
	    
	    public static VentasChartResponseDTO success(VentasChartDTO data, String mensaje) {
	        return new VentasChartResponseDTO(data, mensaje);
	    }
	    
	    public static VentasChartResponseDTO error(String mensaje) {
	        return new VentasChartResponseDTO(mensaje);
	    }
}
