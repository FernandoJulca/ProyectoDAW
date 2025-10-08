package com.ProyectoDAW.Ecommerce.repository;

import com.ProyectoDAW.Ecommerce.dto.PedidoDTO;
import com.ProyectoDAW.Ecommerce.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query("""
            SELECT new com.ProyectoDAW.Ecommerce.dto.PedidoDTO(
            v.idVenta,
            p.numPedido,
            v.usuario.idUsuario,
            v.usuario.nombres,
            p.fecha,
            v.total,
            p.direccionEntrega,
            p.latitud,
            p.longitud,
            v.detalles,
            p.repartidor.idUsuario,
            p.repartidor.nombres,
            v.especificaciones,
            p.estado
            ) FROM Pedido p
            JOIN p.venta v""")
    List<PedidoDTO> listarPedidos();
}
