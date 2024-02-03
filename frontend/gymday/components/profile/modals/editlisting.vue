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
    profileStore.selectedListing.images[index] = files[0];
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
    profileStore.editListing(
        profileStore.selectedListing.Title,
        profileStore.selectedListing.City,
        profileStore.selectedListing.Tags,
        profileStore.selectedListing.Description,
        profileStore.selectedListing.Price,
        profileStore.selectedListing.Location,
        profileStore.selectedListing.Images,
        profileStore.selectedListing.Private
    )
}
</script>

<template>
    <UModal v-model="profileStore.isEditListingOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Listing Aanpassen
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="profileStore.isEditListingOpen = false" />
                </div>
            </template>
            <UForm :validate="validate" :state="profileStore.selectedListing" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Titel" name="title">
                    <UInput v-model="profileStore.selectedListing.Title" />
                </UFormGroup>

                <UFormGroup label="Tags" name="tags">
                    <USelectMenu v-model="profileStore.selectedListing.Tags" :options="tags" multiple>
                        <template #label>
                            <span v-if="profileStore.selectedListing.Tags.length" class="truncate">{{ profileStore.selectedListing.Tags.map((tag) => tag.Name).join(', ') }}</span>
                            <span v-else>Select tags</span>
                        </template>
                    </USelectMenu>
                </UFormGroup>

                <UFormGroup label="Stad" name="city">
                    <UInput v-model="profileStore.selectedListing.City" />
                </UFormGroup>

                <UFormGroup label="Locatie" name="location">
                    <UInput v-model="profileStore.selectedListing.Location" />
                </UFormGroup>

                <UFormGroup label="Omschrijving" name="description">
                    <UTextarea v-model="profileStore.selectedListing.Description" />
                </UFormGroup>

                <UFormGroup label="Prijs" name="price">
                    <UInput v-model="profileStore.selectedListing.Price">
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                </UFormGroup>

                <div class="flex justify-between" v-for="image, index in profileStore.selectedListing.Images" :key="index">
                    <UFormGroup :label="'Foto ' + (index + 1)" name="images">
                        <label class="block">
                            <span class="sr-only">Choose profile photo</span>
                            <input type="file" @change="handleFile($event, index)" name="upload" accept="image/*" class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-50 file:text-gray-500
                                hover:file:bg-gray-100
                                " />
                        </label>
                    </UFormGroup>
                    <MinusCircleIcon v-show="index !== 0" @click="profileStore.selectedListing.Images.splice(index, 1)"
                        class="h-6 w-6 mt-auto text-red-500 hover:cursor-pointer" />
                </div>
                <div class="w-fit mx-auto">
                    <PlusCircleIcon @click="profileStore.selectedListing.Images.push('')"
                        class="h-6 w-6 text-green-500 hover:cursor-pointer" />
                </div>

                <UFormGroup label="Prive Listing" name="private" class="flex space-x-2 align-end">
                    <UCheckbox v-model="profileStore.selectedListing.Private" name="private" />
                </UFormGroup>

                <UButton type="submit" block label="Opslaan">
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
