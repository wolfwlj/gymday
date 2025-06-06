<script setup>
import { baseURL } from '../api';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import useAuthStore from '../stores/auth'
import Swal from 'sweetalert2'

useSeoMeta({
    title: 'Login',
    ogTitle: 'Login - GymDay',
    description: 'Login op jouw GymDay account',
    ogDescription: 'Login op jouw GymDay account', 
})

definePageMeta({
    layout: 'guest',
});


const { loginuser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();

const togglePassword = ref(false);

const form = ref({
    Email: '',
    Password: '',
})

async function login() {
    if(await loginuser(form.value.Email, form.value.Password)){
        await Swal.fire({
            title: 'Ingelogd!',
            icon: 'success',
            timerProgressBar: true,
            timer: 1000,

        }) 
        router.push('/');
    } else {
        Swal.fire({
            title: 'Verkeerde login gegevens',
            text: 'Probeer het opnieuw',
            icon: 'error',
            confirmButtonText: 'Ok',
        })    
    }
    

}



</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex justify-between">
            <h2 class="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Login op jouw account
            </h2>
            <NuxtLink :to="`/`" >
                <button class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GymDay</button>
            </NuxtLink>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" @submit.prevent="login(form)">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Adres </label>
                        <div class="mt-2">
                            <input v-model="form.Email" id="email" name="email" type="email" autocomplete="email"
                                required=""
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Wachtword</label>
                        <div class="mt-2 relative">
                            <input v-model="form.Password" :type="togglePassword ? 'text' : 'password'" id="password"
                                name="password" autocomplete="current-password" required=""
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            <UIcon :name="togglePassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                                @click="togglePassword = !togglePassword"
                                class="hover:cursor-pointer absolute top-3 right-3" />
                        </div>
                    </div>

                    <div class="text-sm leading-6 w-fit ms-auto">
                        <a href="#" class="font-semibold text-green-600 hover:text-green-500">Wachtwoord vergeten?</a>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-green-500 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            Inloggen
                        </button>
                    </div>
                </form>

                <div>
                    <div class="relative my-5">
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                            <div class="w-full border-t border-gray-200" />
                        </div>
                        <div class="relative flex justify-center text-sm font-medium leading-6">
                            <span class="bg-white px-6 text-gray-900">Of</span>
                        </div>
                    </div>

                    <div>
                        <NuxtLink :to="`/register`"
                            class="flex w-full justify-center rounded-md bg-slate-300 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300">
                            Account maken</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
