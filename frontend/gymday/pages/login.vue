<script setup>
import { baseURL } from '../api';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import  useAuthStore  from '../stores/auth'

const { loginuser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();

const togglePassword = ref(false);

const form = ref({
    Username : '',
    Password : '',
})

async function login(form){
    await loginuser(form.Username, form.Password); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated

    if (authenticated) {
        router.push('/');
    }
}
</script>

<template>
    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[30%] mt-10">
            <!-- inputs -->
            <input v-model="form.Username" type="text" placeholder="Username" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <div class="flex mb-4 relative">
                <input v-model="form.Password" :type="[togglePassword ? 'text' : 'password']" placeholder="Password"
                    class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent flex-1">
                <UIcon :name="[togglePassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash']" @click="togglePassword = !togglePassword" class="hover:cursor-pointer absolute right-0 top-3 right-3" />
            </div>
            <!-- button -->
            <button v-on:click="login(form)" type="submit" class="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">Login</button>
        </div>
    </div>
</template>