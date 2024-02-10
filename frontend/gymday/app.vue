<script setup>
import { baseURL } from './api';
import { ref } from 'vue'
import  useAuthStore  from './stores/auth'

const authstore = useAuthStore()
await authstore.validate()

</script>

<template>
<NuxtLayout>
    <NuxtPage /> 
</NuxtLayout>
</template>