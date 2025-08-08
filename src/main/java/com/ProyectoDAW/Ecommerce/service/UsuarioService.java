package com.ProyectoDAW.Ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoDAW.Ecommerce.repository.IUsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	public long countClientes() {
		return usuarioRepository.count();
	}
}
