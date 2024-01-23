<script setup>
import { baseURL } from '../api';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import  useAuthStore  from '../stores/auth'; // import the auth store we just created

const authstore = useAuthStore()

const router = useRouter();

const { logoutuser } = useAuthStore(); // use authenticateUser action from  auth store

const logout = () => {
    logoutuser();
    router.push('/login');
};

</script>

<template>
    <div class="flex space-between py-4">
        <div class="w-full flex justify-start">
            <NuxtLink :to="`/`">
                <h1 class="text-3xl font-bold text-gray-900">GymDay </h1>
            </NuxtLink>
        </div>
        <div class="w-full flex justify-center">
            <Search />
        </div>
        <div class="w-full flex justify-end		">
            <div class="space-x-2 mr-2" v-if="!authstore.authenticated">
                <NuxtLink :to="`/login`" >
                    <button  class=" text-black font-semibold hover:bg-gray-200/75  py-2 px-2 rounded">Inloggen</button>
                </NuxtLink>

                <NuxtLink :to="`/register`" >
                    <button  class=" text-black font-semibold hover:bg-gray-200/75  py-2 px-2 rounded">Registreren</button>
                </NuxtLink>
            </div>

            <div class="space-x-2" v-if="authstore.authenticated">
                <NuxtLink v-on:click="logout()"  >
                    <button  class=" text-black font-semibold hover:bg-gray-200/75  py-2 px-2 rounded">Uitloggen</button>
                </NuxtLink>                
                
                <NuxtLink :to="`/profile/${authstore.user?.ID}`" class="hover:bg-gray-200/50 p-4 rounded" >
                    <UAvatar :alt="authstore.user?.FirstName + ' ' + authstore.user?.LastName" size="md" />
                    <span class="ps-2 text-black font-semibold">Profiel</span>
                </NuxtLink>

                <NuxtLink :to="`/listing/createlisting`" v-if="authstore.user?.Tier < 99">
                    <button class=" text-black font-semibold hover:bg-gray-200/75  py-2 px-2 rounded">Word een Gymday personal trainer!</button>
                </NuxtLink>

                <NuxtLink :to="`/listing/createlisting`" v-else-if="authstore.user?.Tier == 99">
                    <button class=" text-black font-semibold hover:bg-gray-200/75  py-2 px-2 rounded">Post een Listing</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>