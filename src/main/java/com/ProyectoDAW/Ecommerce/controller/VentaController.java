package com.ProyectoDAW.Ecommerce.controller;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpHeaders;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoDAW.Ecommerce.dto.ResultadoResponse;
import com.ProyectoDAW.Ecommerce.model.DetalleVenta;
import com.ProyectoDAW.Ecommerce.model.Venta;
import com.ProyectoDAW.Ecommerce.service.VentaService;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/venta")
public class VentaController {
	
	@Autowired
	private VentaService ventaService;
	
	
	@PostMapping("/finalizar")
	public ResponseEntity<ResultadoResponse> finalizarVenta(@RequestBody Venta venta) {
	    ResultadoResponse resultado = ventaService.guardarVentaCompleta(venta);
	    if (resultado.isValor()) {
	        return ResponseEntity.ok(resultado);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultado);
	    }
	}
	
	@GetMapping("/{idCliente}/pdf/{idVenta}")
	public ResponseEntity<byte[]> descargarVentaPdf(@PathVariable Integer idCliente, @PathVariable Integer idVenta) {
	    Venta venta = ventaService.obtenerVentaPorCliente(idVenta, idCliente);
	    if (venta == null) {
	        return ResponseEntity.notFound().build();
	    }

	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    Document document = new Document(PageSize.A4, 50, 50, 50, 50);

	    try {
	        PdfWriter.getInstance(document, baos);
	        document.open();

	        // Colores
	        BaseColor colorPrimary = new BaseColor(87, 110, 170);
	        BaseColor colorPrimaryDark = new BaseColor(74, 93, 148);
	        BaseColor colorGray500 = new BaseColor(107, 114, 128);
	        BaseColor colorGray700 = new BaseColor(55, 65, 81);

	        // Fuentes
	        Font empresaFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, colorPrimary);
	        Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, colorPrimary);
	        Font textoFont = FontFactory.getFont(FontFactory.HELVETICA, 12, colorGray700);
	        Font textoGrisFont = FontFactory.getFont(FontFactory.HELVETICA, 10, colorGray500);
	        Font headerTableFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);

	        String estadoTexto = venta.getTipoVenta().equals("P") ? "Presencial" :
	                             venta.getTipoVenta().equals("R") ? "Remota" : "Estado desconocido";

	        // Encabezado
	        Paragraph tituloEmpresa = new Paragraph("Toolify", empresaFont);
	        tituloEmpresa.setAlignment(Element.ALIGN_CENTER);
	        tituloEmpresa.setSpacingAfter(10f);
	        document.add(tituloEmpresa);

	        Paragraph gracias1 = new Paragraph("Gracias por su compra!", tituloFont);
	        gracias1.setAlignment(Paragraph.ALIGN_CENTER);
	        document.add(gracias1);

	        Paragraph detalles = new Paragraph("Detalles de la venta", textoGrisFont);
	        detalles.setAlignment(Paragraph.ALIGN_CENTER);
	        document.add(detalles);
	        document.add(Chunk.NEWLINE);

	        document.add(new Paragraph("Venta ID: " + venta.getIdVenta(), tituloFont));
	        document.add(new Paragraph("Cliente: " + venta.getUsuario().getNombres(), textoFont));
	        document.add(new Paragraph("Dirección: " + venta.getUsuario().getDireccion(), textoFont));
	        document.add(new Paragraph("Fecha: " + venta.getFechaRegistro().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), textoFont));
	        document.add(new Paragraph("Tipo de venta: " + estadoTexto, textoFont));
	        document.add(Chunk.NEWLINE);

	        // Tabla
	        PdfPTable table = new PdfPTable(4);
	        table.setWidthPercentage(100);
	        table.setWidths(new float[]{50, 15, 20, 15});

	        String[] headers = {"Producto", "Cantidad", "Precio Unitario", "Subtotal"};
	        for (String header : headers) {
	            PdfPCell cell = new PdfPCell(new Phrase(header, headerTableFont));
	            cell.setBackgroundColor(colorPrimaryDark);
	            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            cell.setPadding(5);
	            table.addCell(cell);
	        }

	        for (DetalleVenta detalle : venta.getDetalles()) {
	            table.addCell(new Phrase(detalle.getProducto().getNombre(), textoFont));
	            table.addCell(new Phrase(String.valueOf(detalle.getCantidad()), textoFont));
	            table.addCell(new Phrase(String.format("S/ %.2f", detalle.getProducto().getPrecio()), textoFont));
	            table.addCell(new Phrase(String.format("S/ %.2f", detalle.getSubTotal()), textoFont));
	        }

	        document.add(table);
	        document.add(Chunk.NEWLINE);

	        Paragraph total = new Paragraph("Total a pagar: S/ " + String.format("%.2f", venta.getTotal()),
	                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, colorPrimary));
	        total.setAlignment(Element.ALIGN_RIGHT);
	        document.add(total);
	        document.add(Chunk.NEWLINE);

	        Paragraph gracias = new Paragraph("¡Gracias por confiar en nosotros! Esperamos volver a servirle pronto.",
	                textoGrisFont);
	        gracias.setAlignment(Element.ALIGN_CENTER);
	        document.add(gracias);

	        document.close();

	        byte[] pdfBytes = baos.toByteArray();

	        HttpHeaders headersResp = new HttpHeaders();
	        headersResp.setContentType(MediaType.APPLICATION_PDF);
	        headersResp.setContentDispositionFormData("attachment", "venta_" + venta.getIdVenta() + ".pdf");

	        return new ResponseEntity<>(pdfBytes, headersResp, HttpStatus.OK);

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	
	@GetMapping({"/filtradoVentas", "/filtradoVentas/{fechaInicio}&{fechaFin}"})
	public ResponseEntity<?> ListadoVentaFechaAndTipoVenta(
			@PathVariable(required = false) LocalDate fechaInicio,
			@PathVariable(required = false) LocalDate fechaFin,
			@RequestParam(required = false) String tipoVenta
			) {
		
		if(fechaInicio == null || fechaFin == null ) {
			return  ResponseEntity.ok(ventaService.ListadoVentaFechaAndTipoVentaNull());
		}
		return ResponseEntity.ok(ventaService.ListadoVentaFechaAndTipoVenta(fechaInicio, fechaFin, tipoVenta));
		
	};
	
	
}
