<script setup lang="ts">
import { Ref, ref } from 'vue';
import { DockerStats, getDockerStats, getServerStats, ServerStats } from '../code/system';

const lastUpdate: Ref<Date> = ref(new Date());

const serverStats: Ref<ServerStats | null> = ref(null);
const dockerStats: Ref<DockerStats | null> = ref(null);

getServerStats().then((data: ServerStats) => serverStats.value = data);
getDockerStats().then((data: DockerStats) => dockerStats.value = data);
setInterval(() => {
    getServerStats().then((data: ServerStats) => serverStats.value = data);
    getDockerStats().then((data: DockerStats) => dockerStats.value = data);
    lastUpdate.value = new Date();
}, 5000);
</script>

<template>
    <div class="mx-4 my-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <div class="bg-primary grid grid-row-2 text-3xl">
            <p class="flex justify-center items-center h-20 border-b border-accent mx-6">CPU Usage</p>
            <div class="flex justify-center items-center h-28 text-5xl">
                {{ serverStats?.system.cpu_usage }}%
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