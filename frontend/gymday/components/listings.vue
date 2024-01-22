<script setup>
import { baseURL } from '../api';
import useListingStore from '../stores/listingstore';

const listingstore = useListingStore()

const { data : listings} = await useFetch(`${baseURL}/user/listings`, {
    method: 'get',
    credentials: 'include',
})
listingstore.listings = listings.value.listings


</script>

<template>
    <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
        <div v-for="listing in listingstore.listings" :key="listing.ID" class="group relative">
            <NuxtLink :to="`listing/${listing.ID}`">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 rounded">
                    <img :src="`${listing.Images[0].ImageURL}`" alt="" class="h-full w-full object-cover object-center lg:h-full lg:w-full rounded" />
                </div>
                <div class="mt-4 flex flex-col justify-between">
                    <div>
                        {{ listing.Title }}
                    </div>
                    <div>
                        {{ listing.User.FirstName }} {{ listing.User.LastName }}
                    </div>
                    <div>
                        &euro; {{ listing.Price }} / training
                    </div>

                    <div>
                        {{ listing.Location }}
                    </div>

                </div>
            </NuxtLink>
        </div>
    </div>
</template>