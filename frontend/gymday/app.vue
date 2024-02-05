<script setup>
import { baseURL } from './api';
import { ref } from 'vue'
import  useAuthStore  from './stores/auth'

const authstore = useAuthStore()
// const token = ref(useCookie('gymdaytoken'))

await authstore.validate()

</script>

<template>
<NuxtLayout>
    <NuxtPage /> 
</NuxtLayout>
</template>