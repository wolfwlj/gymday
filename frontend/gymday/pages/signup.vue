<script setup>
import { baseURL } from '../api';
import { ref } from 'vue'

let togglePassword = ref(false);

const form = ref({
    Username: '',
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
})

async function signup(form) {

    const { data } = await useFetch(`${baseURL}/user/signup`, {
        method: 'post',
        body: {
            Username: form.Username,
            Email: form.Email,
            Password: form.Password,
            FirstName: form.FirstName,
            LastName: form.LastName,
            PhoneNumber: form.PhoneNumber,

        },
    })
}

</script>

<template>
    <div class="flex justify-center align-middle item-center">
        <form class="flex flex-col w-[30%] mt-10">
            <!-- inputs -->
            <input v-model="form.Username" type="text" placeholder="Username"
                class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="form.Email" type="Email" placeholder="Email"
                class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">

            <div class="flex mb-4 relative">
                <input v-model="form.Password" :type="[togglePassword ? 'text' : 'password']" placeholder="Password"
                    class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent flex-1">
                <UIcon :name="[togglePassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash']" @click="togglePassword = !togglePassword" class="hover:cursor-pointer absolute right-0 top-3 right-3" />
            </div>

            <input v-model="form.FirstName" type="text" placeholder="First Name"
                class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="form.LastName" type="text" placeholder="Last Name"
                class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="form.PhoneNumber" type="text" placeholder="Phone Number"
                class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <!-- button -->
            <button v-on:click="signup(form)" type="submit"
                class="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">Sign
                Up</button>
        </form>
    </div>
</template>