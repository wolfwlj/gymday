<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import useListingStore from '../stores/listingstore';
import { baseURL } from '../api';

const listingstore = useListingStore()
const router = useRouter();

const query = ref('')

async function Search(){
    if(query.value == ''){
        const { data : listings} = await useFetch(`${baseURL}/user/listings`, {
        method: 'get',
        credentials: 'include',
        })
        listingstore.listings = listings.value.listings
        return
    }
    const { data : listings} = await useFetch(`${baseURL}/user/listingssearch/${query.value}`, {
    method: 'get',
    credentials: 'include',
    })
    listingstore.listings = listings.value.listings

    router.push('/');
}

</script>

<template>

    <div class="flex items-center w-[80%] px-4 py-2 rounded-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] bg-white cursor-pointer">
        <input v-model="query" type="text" placeholder="Nederland, Zuid-Holland, Rotterdam, etc..." class="w-[100%] outline-none p-2" />
        <MagnifyingGlassIcon  v-on:click="Search()" class="w-8 h-8"/>
    </div>

</template>