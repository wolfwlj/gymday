<script setup>
import { StarIcon } from '@heroicons/vue/20/solid'
import { baseURL } from '../api'
import useListingStore from '../stores/listingstore'

const listingstore = useListingStore()

const { data: listings } = await useFetch(`${baseURL}/user/listings/none`, {
    method: 'get',
    credentials: 'include',
})

listingstore.listings = listings.value.listings



function convertTohighestRating(rating) {
    return Math.round(rating)
}


</script>

<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
            <h2 class="sr-only">Listings</h2>

            <div class="-mx-px grid sm:grid-cols-1 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                <div v-for="listing in listingstore.listings" :key="listing.ID"
                    class="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                    <NuxtLink :to="`listing/${listing.ID}`">
                        <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                            <img :src="listing.Images[0]?.ImageURL" alt=""
                                class="h-full w-full object-cover object-center" />
                        </div>
                        <div class="pt-10 text-center">
                            <h3 class="text-sm font-medium text-gray-900">
                                <span aria-hidden="true" class="absolute inset-0" />
                                {{ listing.Title }}
                            </h3>
                            <h3 class="text-sm font-medium text-gray-900">
                                <span aria-hidden="true" class="absolute inset-0" />
                                {{ listing.User.FirstName + ' ' + listing.User.LastName }}
                            </h3>
                            <div class="mt-3 flex flex-col items-center">
                                <p class="sr-only">{{ convertTohighestRating(listing.AverageRating)}} out of 5 stars</p>
                                <div class="flex items-center">
                                    <StarIcon v-for="rating in [1,2,3,4,5]" :key="rating"
                                        :class="[convertTohighestRating(listing.AverageRating) >= rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                        aria-hidden="true" />
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{{ listing.AmountOfReviews }} reviews </p>
                            </div>
                            <p class="mt-4 text-base font-medium text-gray-900">
                                &euro; {{ listing.Price }} / training
                            </p>
                            <p class="mt-4 text-base font-medium text-gray-900">
                                {{ listing.Location }}
                            </p>
                            <div class="flex justify-center gap-2 flex-wrap mt-4">
                                <span v-for="tag in listing.Tags" class="rounded bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-100">{{ tag.Name }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
