package com.ProyectoDAW.Ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.repository.ICategoriaRepository;

@Service
public class CategoriaService {
	@Autowired
	private ICategoriaRepository categoriaRepository;
}
