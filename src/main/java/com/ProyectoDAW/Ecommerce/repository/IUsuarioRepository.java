package com.ProyectoDAW.Ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ProyectoDAW.Ecommerce.model.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>{
	@Query("SELECT COUNT(U) FROM Usuario U WHERE U.rol.idRol = 2")
	long countClientes();
}
