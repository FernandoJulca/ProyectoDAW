package com.ProyectoDAW.Ecommerce.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaMensualDTO {
    
    private Integer anio;
    private Integer mes;
    private String mesNombre;
    private Long cantidadVentas;
    private BigDecimal totalVentas;
    
    // Método factory estático para crear desde Object[]
    public static VentaMensualDTO fromObjectArray(Object[] row) {
        Integer anio = ((Number) row[0]).intValue();
        Integer mes = ((Number) row[1]).intValue();
        Long cantidadVentas = (Long) row[2];
        BigDecimal totalVentas = (BigDecimal) row[3];
        
        return VentaMensualDTO.builder()
                .anio(anio)
                .mes(mes)
                .mesNombre(obtenerNombreMes(mes))
                .cantidadVentas(cantidadVentas != null ? cantidadVentas : 0L)
                .totalVentas(totalVentas != null ? totalVentas : BigDecimal.ZERO)
                .build();
    }
    
    // Método auxiliar para obtener nombre del mes (ahora estático)
    private static String obtenerNombreMes(Integer mes) {
        if (mes == null) return "";
        
        String[] meses = {
            "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        };
        
        return mes >= 1 && mes <= 12 ? meses[mes] : "";
    }
    
    // Método para obtener etiqueta completa (útil para el gráfico)
    public String getEtiquetaCompleta() {
        return mesNombre + " " + anio;
    }
    
    // Método para obtener etiqueta corta
    public String getEtiquetaCorta() {
        if (mesNombre != null && mesNombre.length() >= 3) {
            return mesNombre.substring(0, 3) + " " + anio;
        }
        return mesNombre + " " + anio;
    }
    
    // Setter personalizado para mes que actualiza mesNombre
    public void setMes(Integer mes) {
        this.mes = mes;
        this.mesNombre = obtenerNombreMes(mes);
    }
}
