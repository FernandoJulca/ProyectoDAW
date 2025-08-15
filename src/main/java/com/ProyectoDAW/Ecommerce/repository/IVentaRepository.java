package com.ProyectoDAW.Ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ProyectoDAW.Ecommerce.model.Venta;

public interface IVentaRepository extends JpaRepository<Venta, Integer>{
	@Query("SELECT v FROM Venta v WHERE v.usuario.idUsuario = :idUsuario ORDER BY v.idVenta DESC")
	List<Venta> findByUsuarioId(@Param("idUsuario") Integer idUsuario);
	
}
