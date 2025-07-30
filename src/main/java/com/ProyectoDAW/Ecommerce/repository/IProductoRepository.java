package com.ProyectoDAW.Ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ProyectoDAW.Ecommerce.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

}
