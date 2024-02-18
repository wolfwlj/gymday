
<script setup>
import useAvailabilityStore from '~/stores/availability';
import { RetrieveDate, GetMondayOfWeek, GetSundayOfWeek, GetCurrentWeekNumber, GetYear, GetMonth, GetDayOfWeek, GetMinuteCount, RetrieveTimestamp, GetWeekDates, GetCurrentWeekDayDateNumber } from "../../../utils/datefunctions";

const availabilityStore = useAvailabilityStore();

const form = ref({
    title: availabilityStore.selectedTimeSlot.Title,
    startdate: RetrieveDate(availabilityStore.selectedTimeSlot.StartDate),
    starttime:  RetrieveTimestamp(availabilityStore.selectedTimeSlot.StartDate),
    endtime: RetrieveTimestamp(availabilityStore.selectedTimeSlot.EndDate), 
});

console.log(RetrieveTimestamp(availabilityStore.selectedTimeSlot.StartDate))
console.log(availabilityStore.selectedTimeSlot)

</script>


<template>
    <UModal v-model="availabilityStore.editTimeSlotModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Pas dit tijdslot aan.
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="availabilityStore.editTimeSlotModal = false" />
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

                    <div class="flex justify-between">
                        <UButton color="primary" @click="availabilityStore.UpdateTimeSlot(form)" class="mt-4">Aanpassen</UButton>   
                        <UButton color="red" @click="availabilityStore.DeleteTimeSlot()" class="mt-4">Verwijderen</UButton>
                    </div>
                </UForm>
            </div>
        </UCard>
    </UModal>
</template>