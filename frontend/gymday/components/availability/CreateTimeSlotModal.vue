
<script setup>
import useAvailabilityStore from '~/stores/availability';

const availabilityStore = useAvailabilityStore();

const form = ref({
    title: '',
    startdate: '',
    starttime: '',
    endtime: '',
});

</script>


<template>
    <UModal v-model="availabilityStore.createTimeSlotModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Maak een beschikbaarheid tijdslot aan
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="availabilityStore.createTimeSlotModal = false" />
                </div>
            </template>
            <div class="">
                <UForm class="space-y-2">
                    <UFormGroup label="Titel" name="title">
                        <UInput v-model="form.title"  placeholder="optioneel veld"/>
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

                    <UButton color="primary" @click="availabilityStore.CreateTimeSlot(form)" class="mt-4">Voeg toe</UButton>
                </UForm>
            </div>
        </UCard>
    </UModal>
</template>