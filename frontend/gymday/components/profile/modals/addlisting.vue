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
        ],
        private : true,
    })
    
    const validate = (state) => {
        const errors = []
        if (!state.title) errors.push({ path: 'title', message: 'Verplicht' })
        if (!state.city) errors.push({ path: 'city', message: 'Verplicht' })
    
    
        return errors
    }
    const onSubmit = () => {
        profileStore.addListing(state.title, state.city)
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

    
                            <UButton type="submit">
                                Opslaan
                            </UButton>
                        </UForm>
    
                    </div>
                </UCard>
            </UModal>
        </div>
    </template>
    
    