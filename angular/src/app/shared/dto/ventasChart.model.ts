import { Dataset } from "./dataset.model";

export interface VentasChart {
  labels: string[];
  datasets: Dataset[];
}