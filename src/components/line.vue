<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import moment from 'moment';
import { LineChartProps } from '../types/charts/LineChart';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

ChartJS.defaults.plugins.legend.display = false;

const { chartId, datasetIdKey, cssClasses, styles, width, height, plugins, chartData, chartOptions } = withDefaults(defineProps<LineChartProps>(), {
    chartId: "line-chart",
    datasetIdKey: "label",
    width: 400,
    height: 200,
    cssClasses: '',
})
</script>

<template>
    <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :css-classes="cssClasses" :styles="styles" :width="width" :height="height" :plugins="plugins" />
</template>