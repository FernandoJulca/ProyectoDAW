package com.ProyectoDAW.Ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoDAW.Ecommerce.model.Producto;
import com.ProyectoDAW.Ecommerce.model.Proveedor;
import com.ProyectoDAW.Ecommerce.service.ProductoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/producto")
public class ProductoController {

	
	@Autowired
	ProductoService prdService;
	
	
	@GetMapping("/index")
	public List<Producto> ListarProductos() {
		return prdService.obtenerProductosActivos();
	}
	
	@GetMapping("/obtenerId/{id}")
	public ResponseEntity<?>ObtenerId(@PathVariable Integer id) {
		
		if(id== null || id.longValue()<0) {
			return ResponseEntity.badRequest().body("No se pudo encontrar el Producto");
		}
		return ResponseEntity.ok(prdService.ObtenerProductoId(id));
	}
	
	@PostMapping("/registrar")
	public ResponseEntity<?>RegistrarProducto(@RequestBody Producto producto){
		
		if(producto == null) {
			return ResponseEntity.badRequest().body("Producto con credenciales invalidas");
		}

		return ResponseEntity.ok(prdService.RegistrarProducto(producto));
	}
	
	@PutMapping("/actualizar/{id}")
	public ResponseEntity<?> ActualizarProducto(
			@PathVariable Integer id, 
			@RequestBody Producto producto) {
		
		if(id == null || id.longValue() < 0 || producto == null ) {
			return ResponseEntity.badRequest().body("No se pudo actualizar al Proveedor");
		}
		
		return ResponseEntity.ok(prdService.ActualizarProducto(id, producto));
	}
	
	@PutMapping("/desactivar/{id}")
	public ResponseEntity<?> DesactivarProducto(
			@PathVariable Integer id, 
			@RequestBody Producto producto) {
		
		 if(id == null || id.longValue() < 0){
			 return ResponseEntity.badRequest().body("No se obtuvo el id");
		 }
		 Producto prdEncontrado = prdService.ObtenerProductoId(id);
		 	if(prdEncontrado == null) {
		 	   return ResponseEntity.badRequest().body("Producto no encontrado");
		 	}
		 
		 	prdService.DesactivarProducto(id);
	     	 
	    String mensaje = ("Se desactivo al proveedor con codigo: " + prdEncontrado.getIdProducto());
		 return ResponseEntity.ok(mensaje);
	}
	
	 @GetMapping({"/listaCategorias","/listaCategorias/{idCategoria}"})
	 public ResponseEntity<?> listadoCategorias(
			 @PathVariable(required = false) Integer idCategoria,
			 @RequestParam(defaultValue = "ASC") String orden) {
		 if(idCategoria==null || idCategoria.longValue()<0) {
				return ResponseEntity.ok(prdService.obtenerProductosActivos());
			}
		 return ResponseEntity.ok(prdService.listaProductosCategoria(idCategoria,orden));
	 }
	 
}
