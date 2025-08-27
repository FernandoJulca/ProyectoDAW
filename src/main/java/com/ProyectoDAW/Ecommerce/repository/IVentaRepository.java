package com.ProyectoDAW.Ecommerce.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ProyectoDAW.Ecommerce.model.Venta; 
import com.ProyectoDAW.Ecommerce.dto.VentaFiltroFechaTipoUsuario;

public interface IVentaRepository extends JpaRepository<Venta, Integer>{
	@Query("SELECT v FROM Venta v WHERE v.usuario.idUsuario = :idUsuario ORDER BY v.idVenta DESC")
	List<Venta> findByUsuarioId(@Param("idUsuario") Integer idUsuario);

	@Query("""
			
			SELECT v FROM Venta v WHERE v.usuario.idUsuario = :idUsuario
			AND
			v.fechaRegistro BETWEEN :fechaIni AND :fechaFin
			ORDER BY v.idVenta DESC			
			""")
	List<Venta> findByUsuarioAndFecha(@Param("idUsuario") Integer idUsuario,
			@Param("fechaIni") LocalDate fechaIni, @Param("fechaFin") LocalDate fechaFin);
	

    @Query("""
        SELECT COUNT(v.idVenta)
        FROM Venta v
        WHERE FUNCTION('TO_CHAR', v.fechaRegistro, 'YYYY-MM') = :fechaMes
    """)
    Long contarVentasPorMes(@Param("fechaMes") String fechaMes);


    @Query("""
    	    SELECT COALESCE(SUM(d.cantidad), 0)
    	    FROM Venta v
    	    JOIN v.detalles d
    	    WHERE FUNCTION('TO_CHAR', v.fechaRegistro, 'YYYY-MM') = :fechaMes
    	""")
    Long contarProductosVendidosPorMes(@Param("fechaMes") String fechaMes);

    @Query("""
        SELECT COUNT(DISTINCT v.idVenta)
        FROM Venta v
        JOIN v.usuario u
        JOIN u.rol r
        WHERE FUNCTION('TO_CHAR', v.fechaRegistro, 'YYYY-MM') = :fechaMes
          AND r.idRol = 3
    """)
    Long contarClientesAtendidosPorMes(@Param("fechaMes") String fechaMes);
	

    @Query("""
        SELECT COUNT(v)
        FROM Venta v
    """)
    Long obtenerTotalVentas();

    @Query("""
        SELECT COALESCE(SUM(d.cantidad), 0)
        FROM Venta v
        JOIN v.detalles d
    """)
    Long obtenerTotalProductosVendidos();

    @Query("""
        SELECT COALESCE(SUM(v.total), 0)
        FROM Venta v
    """)
    Double obtenerIngresosTotales();
    
    
    @Query("""
    		SELECT NEW com.ProyectoDAW.Ecommerce.dto.VentaFiltroFechaTipoUsuario
    		(v.idVenta, CONCAT(us.nombres,' ',us.apePaterno), us.direccion,
    		v.fechaRegistro,v.total,v.estado,v.tipoVenta) FROM Venta v
    		JOIN v.usuario us
    		WHERE FUNCTION('DATE', v.fechaRegistro) BETWEEN :fechaInicio AND :fechaFin
    		AND (:tipoVenta IS NULL or v.tipoVenta =:tipoVenta)
    		""")
    List<VentaFiltroFechaTipoUsuario>ListadoVentaFechaAndTipoVenta(@Param("fechaInicio")LocalDate fechaInicio,@Param("fechaFin")LocalDate fechaFin, @Param("tipoVenta")String tipoVenta );
    	
    
    @Query("""
    		SELECT NEW com.ProyectoDAW.Ecommerce.dto.VentaFiltroFechaTipoUsuario
    		(v.idVenta, CONCAT(us.nombres,' ',us.apePaterno), us.direccion,
    		v.fechaRegistro,v.total,v.estado,v.tipoVenta) FROM Venta v
    		JOIN v.usuario us
    		""")
    List<VentaFiltroFechaTipoUsuario>ListadoVentaFechaAndTipoVentaNull();
    
    List<Venta> findByTipoVentaAndEstado(String tipoVenta, String estado);
    
    @Modifying
    @Query("UPDATE Venta v SET v.estado = 'E' WHERE v.idVenta = :idVenta")
    void actualizarEstadoEntregado(@Param("idVenta") Integer idVenta);

}
