<script setup>
import useProfileStore from '~/stores/profile';
const profileStore = useProfileStore();

const state = reactive({
    firstname : profileStore.user?.FirstName,
    lastname : profileStore.user?.LastName,
    bio : profileStore.user?.Bio,
    profilepicture : profileStore.user?.ProfilePicture,
})


const validate = (state) => {
    const errors = []
    if (!state.firstname) errors.push({ path: 'firstname', message: 'Verplicht' })
    if (!state.lastname) errors.push({ path: 'lastname', message: 'Verplicht' })


    return errors
}

const onSubmit = () => {
    profileStore.user.FirstName = state.firstname
    profileStore.user.LastName = state.lastname
    profileStore.user.Bio = state.bio
    profileStore.user.ProfilePicture = state.profilepicture
    profileStore.isEditProfileOpen = false

    profileStore.updateProfile()

}



const onWorkshopFilePicked = (Workshop) => {
    const files = Workshop.target.files
    const image = files[0]
    // const filename = files[0].name
    console.log(image)
    state.profilepicture = image
};


</script>

<template>
    <div>  
        <UModal v-model="profileStore.isEditProfileOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Profiel bewerken
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="profileStore.isEditProfileOpen = false" />
                    </div>
                </template>
                <div class="">
                    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="Voornaam" name="firstname">
                            <UInput v-model="state.firstname" />
                        </UFormGroup>

                        <UFormGroup label="Achternaam" name="lastname">
                            <UInput v-model="state.lastname" />
                        </UFormGroup>

                        <UFormGroup label="Bio" name="bio">
                            <UTextarea v-model="state.bio" />
                        </UFormGroup>

                        <UFormGroup label="Profiel foto" name="profilepicture">
                            <input @change="onWorkshopFilePicked" placeholder="Upload een foto" type="file" name="upload" accept="image/*"/>
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

