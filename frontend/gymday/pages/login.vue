<script setup>
import { baseURL } from '../api';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import  useAuthStore  from '../stores/auth'

const { loginuser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

console.log(authenticated.value)

const router = useRouter();

const form = ref({
    Username : '',
    Password : '',
})

async function login(form){
    await loginuser(form.Username, form.Password); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

    if (authenticated) {
        console.log(authenticated.value)
        router.push('/');
    }


}

</script>

<template>
    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[30%] mt-10">
            <!-- inputs -->
            <input v-model="form.Username" type="text" placeholder="Username" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="form.Password" type="Password" placeholder="Password" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <!-- button -->
            <button v-on:click="login(form)" type="submit" class="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">Login</button>
        </div>
    </div>
</template>