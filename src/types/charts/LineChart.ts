import {
  ChartData,
  ChartOptions,
  Plugin as ChartPlugin,
  ScatterDataPoint,
} from "chart.js";

export interface LineChartProps {
  chartId?: string;
  datasetIdKey?: string;
  cssClasses?: string;
  styles?: string;
  width?: number;
  height?: number;
  plugins?: Array<ChartPlugin<"line", Object>>;
  chartData: ChartData<"line", (number | ScatterDataPoint | null)[], unknown>;
  chartOptions: ChartOptions<"line">;
}
