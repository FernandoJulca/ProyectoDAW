package com.ProyectoDAW.Ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoDAW.Ecommerce.dto.ResultadoResponse;
import com.ProyectoDAW.Ecommerce.model.Venta;
import com.ProyectoDAW.Ecommerce.service.VentaService;

@RestController
@RequestMapping("/carro")
public class VentaController {
	@Autowired
	private VentaService ventaService;
	
	@PostMapping("/finalizar")
	public ResponseEntity<ResultadoResponse> finalizarVenta(@RequestBody Venta venta) {
	    ResultadoResponse resultado = ventaService.guardarVentaCompleta(venta);
	    if (resultado.isValor()) {
	        return ResponseEntity.ok(resultado);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultado);
	    }
	}

}
