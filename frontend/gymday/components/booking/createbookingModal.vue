<script setup>
import useBookingStore from '~/stores/booking';

const bookingStore = useBookingStore();

const form = ref({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    startdate: '',
    starttime: '',
    endtime: '',
    listingID: 0,
});
</script>


<template>
    <UModal v-model="bookingStore.addbookingModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Voeg een nieuwe booking toe
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="bookingStore.addbookingModal = false" />
                </div>
            </template>
            <div class="">
                <UForm class="space-y-2">
                    <UFormGroup label="Voornaam" name="voornaam">
                        <UInput v-model="form.firstname"  />
                    </UFormGroup>
                    <UFormGroup label="Achternaam" name="achternaam">
                        <UInput v-model="form.lastname"  />
                    </UFormGroup>
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="form.email"  />
                    </UFormGroup>
                    <UFormGroup label="Telefoonnummer" name="phone">
                        <UInput v-model="form.phone"  />
                    </UFormGroup>
                    <UFormGroup label="Datum" name="startdate">
                        <div class="mt-1">
                            <input v-model="form.startdate" type="date" name="date" id="date" 
                                class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Starttijd" name="starttime">
                        <div  class="mt-1">
                            <input v-model="form.starttime" type="time" name="time" id="time" 
                                class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>                    
                    </UFormGroup>
                    <UFormGroup label="Eindtijd" name="endtime">
                        <div  class="mt-1">
                            <input v-model="form.endtime" type="time" name="time" id="time" 
                                class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Listing ID" name="listingID">
                        <UInput v-model="form.listingID"  />
                    </UFormGroup>
                    
                    <UButton color="primary" @click="bookingStore.manualCreateBooking(form)" class="mt-4">Voeg toe</UButton>
                </UForm>
            </div>
        </UCard>
    </UModal>
</template>