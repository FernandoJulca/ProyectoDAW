package com.ProyectoDAW.Ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ProyectoDAW.Ecommerce.model.Categoria;

public interface ICategoriaRepository extends JpaRepository<Categoria, Integer> {

}
