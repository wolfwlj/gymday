    <script setup>
    import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/20/solid'
    import useProfileStore from '~/stores/profile';
    const profileStore = useProfileStore();
    
    const state = reactive({
        title : '',
        description : '',
        price : 0,
        location : '',
        city : '',
        province : '',
        country : '',
        images : [
            ''
        ],
        private : true,
    })
    
    function handleFile(e, index) {
        const files = e.target.files;
        state.images[index] = files[0];
    }

    const validate = (state) => {
        const errors = []
        if (!state.title) errors.push({ path: 'title', message: 'Verplicht' })
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
        profileStore.addListing(state.title, state.city, state.description, state.price, state.location, state.province, state.country, state.images, state.private)
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
                        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                            <UFormGroup label="Titel" name="title">
                                <UInput v-model="state.title" />
                            </UFormGroup>

                            <UFormGroup label="Stad" name="city">
                                <UInput v-model="state.city" />
                            </UFormGroup>

                            <UFormGroup label="Omschrijving" name="description">
                                <UTextarea v-model="state.description" />
                            </UFormGroup>

                            <UFormGroup label="Prijs" name="price">
                                <UInput v-model="state.price" />
                            </UFormGroup>

                            <UFormGroup label="Locatie" name="location">
                                <UInput v-model="state.location" />
                            </UFormGroup>

                            <UFormGroup label="Provincie" name="province">
                                <UInput v-model="state.province" />
                            </UFormGroup>

                            <UFormGroup label="Land" name="country">
                                <UInput v-model="state.country" />
                            </UFormGroup>
    
                            <div class="flex justify-between" v-for="image, index in state.images" :key="index">
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
                                <MinusCircleIcon v-show="index !== 0" @click="state.images.splice(index, 1)" class="h-6 w-6 mt-auto text-red-500 hover:cursor-pointer" />
                            </div>
                            <div class="w-fit mx-auto">
                                <PlusCircleIcon @click="state.images.push('')" class="h-6 w-6 text-green-500 hover:cursor-pointer" />
                            </div>

                            <UFormGroup label="Prive listing" name="private">
                                <UCheckbox v-model="state.private" name="private" label="prive" />
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
    
    