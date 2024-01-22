<script setup>
import useProfileStore from '~/stores/profile';

const profileStore = useProfileStore();
await profileStore.getlistings()

</script>

<template>
    <div v-for="listing in profileStore.profilelistings" :key="listing.ID" class="group relative">
        <NuxtLink :to="`../listing/${listing.ID}`">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 rounded">
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

</template>


