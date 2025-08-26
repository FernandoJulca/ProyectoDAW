package com.ProyectoDAW.Ecommerce.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.dto.ProductoFilter;
import com.ProyectoDAW.Ecommerce.model.Categoria;
import com.ProyectoDAW.Ecommerce.model.Producto;
import com.ProyectoDAW.Ecommerce.model.Proveedor;
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
	
	public List<Producto> obtenerProductosActivosPorCategorias(Integer idCategoria){
		return productoRepository.findProductosActivosByCategories(idCategoria);
	}
	
	
	public Producto RegistrarProducto(Producto producto) {
		
		if(producto.getImagenBytes()==null || producto.getImagenBytes().length==0) {
			producto.setImagenBytes(null);
		}
		
		return productoRepository.save(producto);
	}
	
	
	public Producto ActualizarProducto(Integer id, Producto producto) {
		Producto prdUpdate = productoRepository.findById(id).orElseThrow();
		
		prdUpdate.setNombre(producto.getNombre());
		prdUpdate.setDescripcion(producto.getDescripcion());
		
		Proveedor prvEncotrado = new Proveedor();
		prvEncotrado.setIdProveedor(producto.getProveedor().getIdProveedor());	
		prdUpdate.setProveedor(prvEncotrado);
	
		Categoria catEncontrado = new Categoria();
		catEncontrado.setIdCategoria(producto.getCategoria().getIdCategoria());
		prdUpdate.setCategoria(catEncontrado);
		
		prdUpdate.setPrecio(producto.getPrecio());
		prdUpdate.setStock(producto.getStock());
		prdUpdate.setFechaRegistro(producto.getFechaRegistro()!=null 
				? producto.getFechaRegistro()
				: LocalDateTime.now() );
		
		prdUpdate.setEstado(true);
		
		return productoRepository.save(prdUpdate);
	}
	
	public Producto ObtenerProductoId(Integer id) {
		return productoRepository.findById(id).orElseThrow();
	}
	
	public void DesactivarProducto(Integer id) {
		Producto prdDesactivado = productoRepository.findById(id).orElseThrow();
		
		if(prdDesactivado!=null) {
			prdDesactivado.setEstado(false);
		}
		productoRepository.save(prdDesactivado);
	}
	
	
	
	
}
