<script setup>
import useListingStore from '~/stores/listingstore';
const listingstore = useListingStore()


</script>
<template>
    <div>  
        <UModal class="" fullscreen v-model="listingstore.imageModal" prevent-close>
            <UCard class="" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-end">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="listingstore.imageModal = false" />
                    </div>
                </template>
                <div class="flex justify-center">
                    <img :src="listingstore.selectedimg" alt="listingpicigeuss"
                        class="max-h-[80vh] object-cover object-center" />
                </div>
            </UCard>
        </UModal>
    </div>
</template>

