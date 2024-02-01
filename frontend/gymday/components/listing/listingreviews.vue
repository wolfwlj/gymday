<script setup>
import useListingStore from '~/stores/listingstore'
import { storeToRefs } from "pinia";
import { UserIcon, StarIcon } from '@heroicons/vue/20/solid'

const listingstore = useListingStore()

const { id } = useRoute().params

await listingstore.getListingReviews(id)

const { reviews } = storeToRefs(listingstore);
</script>
<template>
    <div v-for="review in reviews" :key="review.id" class="flex space-x-4 text-sm text-gray-500">
        <div class="flex-none py-10">
            <img v-if="review.User.ProfilePicture !== ''" :src="review.User.ProfilePicture" alt="" class="h-10 w-10 rounded-full bg-gray-100" />
            <UserIcon v-else class="inline-block h-10 w-10 rounded-full text-gray-500/50" />
        </div>
        <div :class="'border-t border-gray-200 py-10'">
            <h3 class="font-medium text-gray-900">{{ review.User.FirstName + ' ' + review.User.LastName }}</h3>
            <p>
                <time :datetime="review.datetime">{{ (new Date(review.CreatedAt)).toLocaleDateString("en-US") }}</time>
            </p>

            <div class="mt-4 flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                    :class="[review.Rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true" />
            </div>
            <p class="sr-only">{{ review.Rating }} out of 5 stars</p>

            <div class="prose prose-sm mt-4 max-w-none text-gray-500" v-html="review.Body" />
        </div>
    </div>
</template>