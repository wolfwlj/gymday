<script setup>
import { baseURL } from './api';
import { ref } from 'vue'
import  useAuthStore  from './stores/auth'


const authstore = useAuthStore()

// definePageMeta({
//         middleware: ['auth', 'cookieForwarder']
//     })

// let serverCookie;

// if (process.server) {


// }



// const headers = {};

// if (serverCookie) {
//     headers['gymdaytoken'] = serverCookie;
// }

 const token = ref(useCookie('gymdaytoken'))
console.log(token.value)



    await authstore.validate()



// const event = useRequestEvent()

// const { data: result } = await useAsyncData(() => fetchWithCookie(event, `${baseURL}/user/validate`))

// console.log(result)

// onMounted(() => console.log(document.cookie))

</script>

<template>
<NuxtLayout>
    <NuxtPage /> 
</NuxtLayout>
</template>
