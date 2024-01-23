<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import useListingStore from '../stores/listingstore';
import { baseURL } from '../api';

const listingstore = useListingStore()
const router = useRouter();

const query = ref('')

async function search() {
    if (query.value == '') {
        const { data: listings } = await useFetch(`${baseURL}/user/listings`, {
            method: 'get',
            credentials: 'include',
        })
        listingstore.listings = listings.value.listings
        router.push('../');

        return
    }
    const { data: listings } = await useFetch(`${baseURL}/user/listingssearch/${query.value}`, {
        method: 'get',
        credentials: 'include',
    })
    listingstore.listings = listings.value.listings

    router.push('../');
}

</script>

<template>
    <form @submit.prevent="search()">
        <label for="query" class="sr-only">Search</label>
        <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input id="query" name="query" v-model="query" @keyup="search()"
                class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search" type="search" />
        </div>
    </form>
</template>