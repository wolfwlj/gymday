<script setup>
import useListingStore from '~/stores/listingstore';
const listingstore = useListingStore()


</script>
<template>
    <div>  
        <UModal v-model="listingstore.imageModal" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="listingstore.imageModal = false" />
                    </div>
                </template>
                <div class="">
                    <img :src="listingstore.selectedimg" alt="listingpicigeuss"
                        class="h-full w-full " />
                </div>
            </UCard>
        </UModal>
    </div>
</template>

