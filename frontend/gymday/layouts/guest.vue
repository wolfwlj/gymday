<script setup>
import Header from '../components/header.vue';
import useAuthStore from '../stores/auth'; // import the auth store we just created

const authstore = useAuthStore();
</script>

<template>
    <div class="px-[20px] sm:px-[40px] lg:px-[64px] ">
        <div>
            <slot />
        </div>
    </div>
</template>