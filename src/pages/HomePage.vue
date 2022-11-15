<script setup lang="ts">

</script>

<template>
    <div class="mx-4 my-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="bg-primary h-64 flex items-center justify-center text-5xl" v-for="i in 10">
            {{ i }}
        </div>
    </div>
</template>