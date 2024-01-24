<script setup>
import { baseURL } from '../api';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import useAuthStore from '../stores/auth'

definePageMeta({
    layout: 'guest',
});
// const authstore = useAuthStore()

// const route = useRoute()

// //get the token from the url
// const token = route.params.token
// //verify the token

// await authstore.verifyEmail(token); // call authenticateUser and pass the user object
// // redirect to homepage if user is authenticated
// </script>

<template>
    <p>Bekijk je email om je account te verifieren.</p>
</template>
