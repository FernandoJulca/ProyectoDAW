package com.ProyectoDAW.Ecommerce.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
import org.springframework.web.bind.annotation.GetMapping;



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
	
	
	@PostMapping("/grilla")
	public ResponseEntity<ResultadoResponse> finalizarVentaVendedor(@RequestBody Venta venta) {
	    ResultadoResponse resultado = ventaService.guardarVentaCompleta(venta);
	    if (resultado.isValor()) {
	        return ResponseEntity.ok(resultado);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultado);
	    }
	}
	
	@GetMapping("/mensual/ventas")
    public ResponseEntity<Long> contarVentasMesActual() {
        Long totalVentas = ventaService.obtenerTotalVentasMensual();
        return ResponseEntity.ok(totalVentas);
    }

    @GetMapping("/mensual/productos")
    public ResponseEntity<Long> contarProductosVendidosMesActual() {
        Long totalProductos = ventaService.obtenerTotalProductosVendidosMensual();
        return ResponseEntity.ok(totalProductos);
    }

    @GetMapping("/mensual/clientes")
    public ResponseEntity<Long> contarClientesAtendidosMesActual() {
        Long totalClientes = ventaService.obtenerTotalClientesAtendidosMensual();
        return ResponseEntity.ok(totalClientes);
    }
	
    @GetMapping("/total/ventas")
    public ResponseEntity<Long> obtenerTotalVentas() {
        return ResponseEntity.ok(ventaService.obtenerTotalVentas());
    }

    @GetMapping("/total/productos")
    public ResponseEntity<Long> obtenerTotalProductosVendidos() {
        return ResponseEntity.ok(ventaService.obtenerTotalProductosVendidos());
    }

    @GetMapping("/total/ingresos")
    public ResponseEntity<Double> obtenerIngresosTotales() {
        return ResponseEntity.ok(ventaService.obtenerIngresosTotales());
    }
}
