<script setup>
import useProfileStore from '~/stores/profile';

const profileStore = useProfileStore();
await profileStore.GetProfileImages()

</script>

<template>
    <div v-if="profileStore.profileimages.length == 0">
        <p>geen Foto's gevonden..</p>
    </div>
    <div v-else class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="image in profileStore.profileimages" :key="image.ID" class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 rounded">
                <img :src="`${image.Images[0]?.ImageURL}`" alt="" class="h-full w-full object-cover object-center lg:h-full lg:w-full rounded" />
            </div>
        </div>
    </div>
</template>


