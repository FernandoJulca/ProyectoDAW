package com.ProyectoDAW.Ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.repository.IProveedorRepository;

@Service
public class ProveedorService {
	@Autowired
	private IProveedorRepository proveedorRepository;
}
