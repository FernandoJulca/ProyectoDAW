package com.ProyectoDAW.Ecommerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoDAW.Ecommerce.dto.VentaDTO;
import com.ProyectoDAW.Ecommerce.service.VentaService;

@RestController
@RequestMapping("/repartidor")
public class RepartidorController {

	private final VentaService ventaService;

    public RepartidorController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    
    @GetMapping("/pedidos")
    public ResponseEntity<List<VentaDTO>> obtenerPedidosDeliveryPendientes() {
        List<VentaDTO> pedidos = ventaService.obtenerPedidosDeliveryPendientes();
        return ResponseEntity.ok(pedidos);
    }
	
}
