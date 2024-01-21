<script setup>
import Header from '../components/header.vue';


</script>



<template>
    <div class="px-[20px] sm:px-[40px] lg:px-[64px]">
        <Header />
        <div >
            <slot />
        </div>
    </div>

</template>