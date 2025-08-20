package com.ProyectoDAW.Ecommerce.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ProyectoDAW.Ecommerce.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {
	
	@Query("SELECT P FROM Producto P WHERE P.estado = TRUE ORDER BY 1 ASC")
	List<Producto> findProductosActivos();
	
	@Query("SELECT P FROM Producto P WHERE P.estado = TRUE")
	Page<Producto> findProductsActive(Pageable pageable);
	
	@Query("""
		    SELECT P FROM Producto P
		    WHERE (:idCategorias IS NULL OR P.categoria.idCategoria IN :idCategorias)
		      AND P.estado = TRUE
		""")
	Page<Producto> findAllWithFilter(@Param("idCategorias") List<Integer> idCategorias, Pageable pageable);
	
	@Query("SELECT COUNT(P) FROM Producto P WHERE P.estado = TRUE")
	long countProducts();
	
	@Modifying
	@Query("UPDATE Producto p SET p.stock = :nuevoStock WHERE p.idProducto = :id")
	void actualizarStock(@Param("id") Integer id, @Param("nuevoStock") Integer nuevoStock);

}
