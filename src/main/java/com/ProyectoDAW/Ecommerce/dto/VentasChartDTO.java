package com.ProyectoDAW.Ecommerce.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentasChartDTO {
	private List<String> labels;
    private List<DatasetDTO> datasets;
    
    // Clase interna para los datasets
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DatasetDTO {
        private String label;
        private List<Number> data;
        private String borderColor;
        private String backgroundColor;
        @Builder.Default
        private Integer borderWidth = 2;
        @Builder.Default
        private Boolean fill = false;
        @Builder.Default
        private String tension = "0.4";
        
        // Constructor personalizado para facilitar la creación
        public DatasetDTO(String label, List<Number> data, String borderColor, String backgroundColor) {
            this.label = label;
            this.data = data;
            this.borderColor = borderColor;
            this.backgroundColor = backgroundColor;
            this.borderWidth = 2;
            this.fill = false;
            this.tension = "0.4";
        }
    }
}
