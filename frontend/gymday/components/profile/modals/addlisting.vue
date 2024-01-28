    <script setup>
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
        images : [{
            ImageURL : '',
            ImageNR : 1,
        },
        {
            ImageURL : '',
            ImageNR : 2,
        },
        {
            ImageURL : '',
            ImageNR : 3,
        },
        {
            ImageURL : '',
            ImageNR : 4,
        },
        {
            ImageURL : '',
            ImageNR : 5,
        },
        ],
        private : true,
    })
    
    const onFilePicked1 = (file) => { const files = file.target.files; state.images[0] = files[0];};
    const onFilePicked2 = (file) => { const files = file.target.files; state.images[1] = files[0];};
    const onFilePicked3 = (file) => { const files = file.target.files; state.images[2] = files[0];};
    const onFilePicked4 = (file) => { const files = file.target.files; state.images[3] = files[0];};
    const onFilePicked5 = (file) => { const files = file.target.files; state.images[4] = files[0];};

    const validate = (state) => {
        const errors = []
        if (!state.title) errors.push({ path: 'title', message: 'Verplicht' })
        if (!state.city) errors.push({ path: 'city', message: 'Verplicht' })
        if (!state.description) errors.push({ path: 'description', message: 'Verplicht' })
        if (!state.price) errors.push({ path: 'price', message: 'Verplicht' })
        if (!state.location) errors.push({ path: 'location', message: 'Verplicht' })
        if (!state.province) errors.push({ path: 'province', message: 'Verplicht' })
        if (!state.country) errors.push({ path: 'country', message: 'Verplicht' })
    
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
    
                            <UFormGroup label="Foto 1 (hoofd foto)" name="image1">
                                <input @change="onFilePicked1" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
                            </UFormGroup>
                            <UFormGroup label="Foto 2 " name="image2">
                                <input @change="onFilePicked2" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
                            </UFormGroup>
                            <UFormGroup label="Foto 3 " name="image3">
                                <input @change="onFilePicked3" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
                            </UFormGroup>
                            <UFormGroup label="Foto 4 " name="image4">
                                <input @change="onFilePicked4" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
                            </UFormGroup>
                            <UFormGroup label="Foto 5" name="image5">
                                <input @change="onFilePicked5" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
                            </UFormGroup>
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
    
    