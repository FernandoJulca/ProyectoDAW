package com.ProyectoDAW.Ecommerce.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.dto.ProductoFilter;
import com.ProyectoDAW.Ecommerce.model.Producto;
import com.ProyectoDAW.Ecommerce.repository.IProductoRepository;

@Service
public class ProductoService {
	@Autowired
	private IProductoRepository productoRepository;
	
	public Page<Producto> getProducteForCategorie(ProductoFilter filter, Pageable pageable) {
		if (filter.getIdCategorias() == null || filter.getIdCategorias().isEmpty()) {
			return productoRepository.findProductsActive(pageable);
		} else {
			return productoRepository.findAllWithFilter(filter.getIdCategorias(), pageable);
		}
	}
	public long countProductos() {
		return productoRepository.count();
	}
	
	public List<Producto> obtenerProductosActivos(){
		return productoRepository.findProductosActivos();
	}
	
}
