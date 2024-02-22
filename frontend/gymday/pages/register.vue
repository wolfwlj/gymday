<script setup>
import { baseURL } from '../api';
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import useAuthStore from '../stores/auth'
import Swal from 'sweetalert2'


useSeoMeta({
    title: 'Registreer',
    ogTitle: 'Registreer - GymDay',
    description: 'Registreer een account op GymDay',
    ogDescription: 'Registreer een account op GymDay', 
})

definePageMeta({
    layout: 'guest',
});

const { loginuser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();
 
const togglePassword = ref(false);

let errors = reactive([]);

const form = ref({
    Email: '',
    Password: '',
    PasswordConfirmation: '',
    First_Name: '',
    Last_Name: '',
    Phone_Number: '',
})

const errorCheck = ref(false);

async function signup() {
    errors = [];
    const fields = Object.entries(form.value);
    console.log(fields)

    for (let i = 0; i < fields.length; i++) {
        if (fields[i][0] === 'PasswordConfirmation') continue;

        fields[i][0] = fields[i][0].replace('_', ' ');

        if (!fields[i][1]) {
            console.log(fields[i] + ' is verplicht!')

            errors.push(fields[i][0] + ' is verplicht!');
            errorCheck.value = true;
        }
    }

    if (form.Password !== form.PasswordConfirmation) {
        errorCheck.value = true;
        errors.push('Wachtwoord is verplicht!');
    }

    if (errorCheck.value) return;

    const { data } = await useFetch(`${baseURL}/user/register`, {
        method: 'post',
        body: {
            Email: form.value.Email,
            Password: form.value.Password,
            FirstName: form.value.First_Name,
            LastName: form.value.Last_Name,
            PhoneNumber: form.value.Phone_Number,
        },
    });

    if (data.value.user) {
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
                title: 'Iets is verkeerd gegaan',
                text: 'Probeer handmatig in te loggen',
                icon: 'error',
                confirmButtonText: 'Ok',
            })    
        }
    }
}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex justify-between">
            <h2 class="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Creeër een account</h2>
            <NuxtLink :to="`/`" >
                <button class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GymDay</button>
            </NuxtLink>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

            <div v-if="errorCheck">
                <div class="rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="ml-3 w-full">
                            <div class="flex justify-between">
                                <h3 class="text-sm font-medium text-red-800">Er zijn {{ Object.keys(errors).length }} velden zonder invoer.</h3>
                                <UIcon name="i-heroicons-x-mark" @click="errorCheck = false" class="cursor-pointer" />
                            </div>

                            <div class="mt-2 text-sm text-red-700">
                                <ul role="list" class="list-disc space-y-1 pl-5">
                                    <div v-for="error in errors">
                                        <li>{{ error }}</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" @submit.prevent="signup()">
                    <div class="flex justify-between">
                        <div>
                            <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">
                                Voornaam
                            </label>
                            <div class="mt-2">
                                <input v-model="form.First_Name" id="first_name" name="first_name" type="text"
                                    autocomplete=""
                                    class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Achternaam</label>
                            <div class="mt-2">
                                <input v-model="form.Last_Name" id="last_name" name="last_name" type="text"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Adres</label>
                        <div class="mt-2">
                            <input v-model="form.Email" id="email" name="email" type="email" autocomplete="email"
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label for="phone_number" class="block text-sm font-medium leading-6 text-gray-900">Telefoon    
                            nummer</label>
                        <div class="mt-2">
                            <input v-model="form.Phone_Number" id="phone_number" name="phone_number" type="tel"
                                autocomplete="tel"
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Wachtwoord</label>
                        <div class="mt-2 relative">
                            <input v-model="form.Password" :type="togglePassword ? 'text' : 'password'" id="password"
                                name="password" autocomplete="current-password"
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            <UIcon :name="togglePassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                                @click="togglePassword = !togglePassword"
                                class="hover:cursor-pointer absolute right-0 top-3 right-3" />
                        </div>
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">
                            Wachtwoord herhalen</label>
                        <div class="mt-2 relative">
                            <input v-model="form.PasswordConfirmation" type="password" id="password_confirmation"
                                name="password_confirmation" autocomplete="current-password"
                                class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-green-500 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Creeër Account</button>
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
                        <NuxtLink :to="`/login`"
                            class="flex w-full justify-center rounded-md bg-slate-300 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300">
                            Inloggen</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
