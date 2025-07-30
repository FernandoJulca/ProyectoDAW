package com.ProyectoDAW.Ecommerce.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TB_VENTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Venta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_VENTA")
	private Integer idVenta;
	
	@ManyToOne
	@JoinColumn(name="ID_USUARIO")
	private Usuario usuario;
	
	@Column(name="FECHA_REGISTRO")
	private LocalDateTime fechaRegistro;
	
	@Column(name="TOTAL")
	private Double total;
	
	@Column(name="ESTADO")
	private String estado;
	
	@Column(name="TIPO_VENTA")
	private String tipoVenta;
	
	@OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
	private List<DetalleVenta> detalles;

}
