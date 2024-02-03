<script setup>
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/20/solid'
import useProfileStore from '~/stores/profile';
const profileStore = useProfileStore();

const tags = [
    'Bodybuilding',
    'Crossfit',
    'Calisthenics',
    'Yoga',
    'Cardio',
    'Fitness',
    'Powerlifting',
    'Powerbuilding',
    'Strongman',
    'Zwemmen',
    'Vechtsporten',
    'Andere',
]

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
    if (!state.images[0]) errors.push({ path: 'images', message: 'Verplicht' })

    return errors
}

const onSubmit = () => {
    profileStore.addListing(
        profileStore.addListingState.title, 
        profileStore.addListingState.city, 
        profileStore.addListingState.tags, 
        profileStore.addListingState.description, 
        profileStore.addListingState.price, 
        profileStore.addListingState.location, 
        profileStore.addListingState.images, 
        profileStore.addListingState.private
        )
}
</script>

<template>
    <UModal v-model="profileStore.isAddListingOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Listing Aanmaken
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="profileStore.isAddListingOpen = false" />
                </div>
            </template>
            <UForm :validate="validate" :state="profileStore.addListingState" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Titel" name="title">
                    <UInput v-model="profileStore.addListingState.title" />
                </UFormGroup>

                <UFormGroup label="Tags" name="tags">
                    <USelectMenu v-model="profileStore.addListingState.tags" :options="tags" multiple>
                        <template #label>
                            <span v-if="profileStore.addListingState.tags.length" class="truncate">{{ profileStore.addListingState.tags.join(', ') }}</span>
                            <span v-else>Select tags</span>
                        </template>
                    </USelectMenu>
                </UFormGroup>

                <UFormGroup label="Stad" name="city">
                    <UInput v-model="profileStore.addListingState.city" />
                </UFormGroup>

                <UFormGroup label="Locatie" name="location">
                    <UInput v-model="profileStore.addListingState.location" />
                </UFormGroup>

                <UFormGroup label="Omschrijving" name="description">
                    <UTextarea v-model="profileStore.addListingState.description" />
                </UFormGroup>

                <UFormGroup label="Prijs" name="price">
                    <UInput v-model="profileStore.addListingState.price">
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                </UFormGroup>

                <div class="flex justify-between" v-for="image, index in profileStore.addListingState.images"
                    :key="index">
                    <UFormGroup :label="'Foto ' + (index + 1)" name="images">
                        <label class="block">
                            <span class="sr-only">Choose profile photo</span>
                            <input type="file" @change="handleFile($event, index)" name="upload" accept="image/*"
                                class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-50 file:text-gray-500
                                hover:file:bg-gray-100
                                " />
                        </label>
                    </UFormGroup>
                    <MinusCircleIcon v-show="index !== 0"
                        @click="profileStore.addListingState.images.splice(index, 1)"
                        class="h-6 w-6 mt-auto text-red-500 hover:cursor-pointer" />
                </div>
                <div class="w-fit mx-auto">
                    <PlusCircleIcon @click="profileStore.addListingState.images.push('')"
                        class="h-6 w-6 text-green-500 hover:cursor-pointer" />
                </div>

                <UFormGroup label="Prive Listing" name="private" class="flex space-x-2 align-end">
                    <UCheckbox v-model="profileStore.addListingState.private" name="private" />
                </UFormGroup>

                <UButton type="submit" block label="Opslaan">
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
