package com.ProyectoDAW.Ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ProyectoDAW.Ecommerce.model.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>{

}
