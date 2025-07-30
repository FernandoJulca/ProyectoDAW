package com.ProyectoDAW.Ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.repository.IVentaRepository;

@Service
public class VentaService {
	@Autowired
	private IVentaRepository ventaRepository;
}
