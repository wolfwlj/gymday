<script setup>
import useProfileStore from '~/stores/profile';
import Addlisting from './modals/addlisting.vue';

const profileStore = useProfileStore();
await profileStore.getlistings()

</script>

<template>
    <!-- sort of header -->
    <div class="">
        <UButton @click="profileStore.isAddListingOpen = true">Listing toevoegen</UButton>
        <Addlisting v-if="profileStore.isAddListingOpen" />
    </div>
    
    
    
    <div v-if="profileStore.profilelistings.length == 0">
        <p>geen listings gevonden..</p>
    </div>
    <div v-else class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                        {{ listing.Location }}
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>


