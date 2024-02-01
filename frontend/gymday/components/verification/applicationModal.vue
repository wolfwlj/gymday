<script setup>
import useAdminStore from  '~/stores/admin';

const adminStore = useAdminStore();

const reply = ref('')
</script>


<template>
    <UModal v-model="adminStore.applicationModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        App aanvraag
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="adminStore.applicationModal = false" />
                </div>
            </template>
            <div class="">
                <p>
                Name : 
                    {{ adminStore.selectedApplication.User.FirstName }}
                    {{ adminStore.selectedApplication.User.LastName }}
                </p>    
                <p class="mt-2">
                    Reason : 
                </p>
                <p>
                    {{ adminStore.selectedApplication.Reason }}
                </p>
                <p class="mt-8">
                    Reply to application, this will be send to the user. :
                </p>
                <UTextarea v-model="reply" class="mt-2" />

                <div class="flex justify-between">
                    <UButton @click="adminStore.UpdateApplication(reply, 'approved')" class="mt-4">Accept application</UButton>
                    <UButton @click="adminStore.UpdateApplication(reply, 'declined')" color="red" variant="ghost" class="mt-4">Decline application</UButton>
                </div>
                

            </div>
        </UCard>
    </UModal>
</template>