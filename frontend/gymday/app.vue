<script setup>
import { baseURL } from './api';
import { ref } from 'vue'
import  useAuthStore  from './stores/auth'

const authstore = useAuthStore()
const token =  useCookie('token')

await authstore.validate(token.value)

</script>

<template>
<NuxtLayout>
    <NuxtPage /> 
</NuxtLayout>
</template>
