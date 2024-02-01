    <script setup>
    import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/20/solid'
    import useProfileStore from '~/stores/profile';
    import useListingStore from '~/stores/profile';
    import tags from '~/components/input/tags.vue'
    const profileStore = useProfileStore();

    function handleFile(e, index) {
        const files = e.target.files;
        profileStore.addListingState.images[index] = files[0];
    }

    const validate = (state) => {
        const errors = []
        if (!state.title) errors.push({ path: 'title', message: 'Verplicht' })
        if (!state.tags) errors.push({ path: 'title', message: 'Verplicht' })
        if (!state.city) errors.push({ path: 'city', message: 'Verplicht' })
        if (!state.description) errors.push({ path: 'description', message: 'Verplicht' })
        if (!state.price) errors.push({ path: 'price', message: 'Verplicht' })
        if (!state.location) errors.push({ path: 'location', message: 'Verplicht' })
        if (!state.province) errors.push({ path: 'province', message: 'Verplicht' })
        if (!state.country) errors.push({ path: 'country', message: 'Verplicht' })
        if (!state.images[0]) errors.push({ path: 'images', message: 'Verplicht' })
    
        return errors
    }

    const onSubmit = () => {
        profileStore.addListing(profileStore.addListingState.title, profileStore.addListingState.city, profileStore.addListingState.tags, profileStore.addListingState.description, profileStore.addListingState.price, profileStore.addListingState.location, profileStore.addListingState.province, profileStore.addListingState.country, profileStore.addListingState.images, profileStore.addListingState.private)
    }

</script>

<template>
    <div>  
        <UModal v-model="profileStore.isAddListingOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Listing aanmaken
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="profileStore.isAddListingOpen = false" />
                    </div>
                </template>
                <div class="">
                    <UForm :validate="validate" :state="profileStore.addListingState" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="Titel" name="title">
                            <UInput v-model="profileStore.addListingState.title" />
                        </UFormGroup>

                        <UFormGroup label="Tags" name="tags">
                            <tags  />
                        </UFormGroup>

                        <UFormGroup label="Stad" name="city">
                            <UInput v-model="profileStore.addListingState.city" />
                        </UFormGroup>

                        <UFormGroup label="Omschrijving" name="description">
                            <UTextarea v-model="profileStore.addListingState.description" />
                        </UFormGroup>

                        <UFormGroup label="Prijs" name="price">
                            <UInput v-model="profileStore.addListingState.price" />
                        </UFormGroup>

                        <UFormGroup label="Locatie" name="location">
                            <UInput v-model="profileStore.addListingState.location" />
                        </UFormGroup>

                        <UFormGroup label="Provincie" name="province">
                            <UInput v-model="profileStore.addListingState.province" />
                        </UFormGroup>

                        <UFormGroup label="Land" name="country">
                            <UInput v-model="profileStore.addListingState.country" />
                        </UFormGroup>

                        <div class="flex justify-between" v-for="image, index in profileStore.addListingState.images" :key="index">
                            <UFormGroup :label="'Foto ' + (index + 1)" name="images">
                                <label class="block">
                                    <span class="sr-only">Choose profile photo</span>
                                    <input type="file" @change="handleFile($event, index)" 
                                        name="upload" accept="image/*"
                                        class="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-gray-50 file:text-gray-500
                                        hover:file:bg-gray-100
                                        "/>
                                </label>
                            </UFormGroup>
                            <MinusCircleIcon v-show="index !== 0" @click="profileStore.addListingState.images.splice(index, 1)" class="h-6 w-6 mt-auto text-red-500 hover:cursor-pointer" />
                        </div>
                        <div class="w-fit mx-auto">
                            <PlusCircleIcon @click="profileStore.addListingState.images.push('')" class="h-6 w-6 text-green-500 hover:cursor-pointer" />
                        </div>

                        <UFormGroup label="Prive listing" name="private">
                            <UCheckbox v-model="profileStore.addListingState.private" name="private" label="prive" />
                        </UFormGroup>

                        <UButton type="submit">
                            Opslaan
                        </UButton>
                    </UForm>

                </div>
            </UCard>
        </UModal>
    </div>
</template>

    