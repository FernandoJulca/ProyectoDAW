import { VentasChart } from "./ventasChart.model";

export interface VentasChartResponse {
  valor: boolean;
  mensaje: string;
  data: VentasChart;
}