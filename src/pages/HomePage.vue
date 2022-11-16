<script setup lang="ts">
import { ChartData, ChartOptions, ScatterDataPoint } from 'chart.js';
import moment from 'moment';
import { Ref, ref, watch } from 'vue';
import { DockerStats, getDockerStats, getServerStats, ServerStats } from '../code/system';
import LineChart from "../components/line.vue"

const lastUpdate: Ref<Date> = ref(new Date());

const serverStats: Ref<ServerStats | null> = ref(null);
const dockerStats: Ref<DockerStats | null> = ref(null);

getServerStats().then((data: ServerStats) => serverStats.value = data);
getDockerStats().then((data: DockerStats) => dockerStats.value = data);
setInterval(() => {
    getServerStats().then((data: ServerStats) => serverStats.value = data);
    getDockerStats().then((data: DockerStats) => dockerStats.value = data);
    chartData.value.labels?.splice(0, 1);
    chartData.value.labels?.push(new Date().toLocaleTimeString());
    lastUpdate.value = new Date();
}, 5000);

watch(serverStats, (newVal) => {
    let data = chartData.value.datasets[0].data;
    data.splice(0, 1);
    data.push(newVal!.system.cpu_usage);
})

const getLabels = (): string[] => {
    let labels: string[] = [];

    for (let i = 0; i < 5; i++) {
        labels.push(moment().subtract(25 - (5 * i), "seconds").toDate().toLocaleTimeString())
    }

    return labels;
}

const chartData: Ref<ChartData<"line", (number | ScatterDataPoint | null)[], unknown>> = ref({
    labels: getLabels(),
    datasets: [
        {
            data: [10, 10, 0, 0, 0],
        }
    ]
})

const chartOptions: Ref<ChartOptions<"line">> = ref({
    responsive: true,
    scales: {
        yAxes: {
            beginAtZero: true,
            min: 0,
            max: 100
        }
    },
    interaction: {
        intersect: false,
    },
    borderColor: "#F5CB5C",
    backgroundColor: "#cfdbd5"
})

</script>

<template>
    <div class="mx-4 my-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">CPU Usage</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ serverStats?.system.cpu_usage }}%
            </div>
            <div>
                <LineChart :chart-data="chartData" :chart-options="chartOptions" />
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">RAM Usage</p>
            <div class="flex flex-col justify-center items-center h-28 text-5xl">
                <div class="text-center">
                    {{ serverStats?.system.ram.usage.toFixed(1) }}%
                </div>
                <div class="text-lg">
                    {{ serverStats?.system.ram.used }} MB / {{ serverStats?.system.ram.available }} MB
                </div>
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">Running Containers</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ dockerStats?.containers.running }}
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">Total Containers</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ dockerStats?.containers.total }}
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">Stopped Containers</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ dockerStats?.containers.stopped }}
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">Total images</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ dockerStats?.containers.images }}
            </div>
        </div>

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">Last Update</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ lastUpdate.toLocaleTimeString() }}
            </div>
        </div>

    </div>
</template>