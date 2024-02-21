<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import useListingStore from '~/stores/listingstore';
import { RetrieveDateJS, GetAllPossibleWeeksInCurrentMonth, GetDatesOfWeeksFromWeekNumber, GetTime, GetMondayOfWeek, GetSundayOfWeek, GetCurrentWeekNumber, GetYear, GetMonth, GetDayOfWeek, GetMinuteCount, RetrieveTimestamp, GetWeekDates, GetCurrentWeekDayDateNumber } from "../../../utils/datefunctions";

const listingStore = useListingStore();


// Get first monday possible of weeks that contain dates of the current month
    
// this gets every week number needed
const days = ref([]);

onMounted(async () => {
    listingStore.dateobject.realCurrentDate = new Date();
    let weeknumbers = GetAllPossibleWeeksInCurrentMonth(listingStore.dateobject.realCurrentDate);
    let year = GetYear(listingStore.dateobject.realCurrentDate);
    days.value = GetDatesOfWeeksFromWeekNumber(weeknumbers, year, listingStore.dateobject.realCurrentDate)
    listingStore.dateobject.selectedDate = RetrieveDateJS(listingStore.dateobject.realCurrentDate);

    // Check with server which dates have available slots
    let datestocheck = days.value.map((day) => day.date);
    let availableSlots = await $fetch(`/api/availability/getavailableslots?ownerid=${listingStore.selectedListing.listing.UserID}&start=${datestocheck[0]}&end=${datestocheck[datestocheck.length - 1]}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } 
    });

    for (let i = 0; i < availableSlots.timeslots.length; i++){
        let date = availableSlots.timeslots[i].split(' ')[0]; 
        for(let j = 0; j < days.value.length; j++){
            if (days.value[j].date == date) {
                days.value[j].hasSlots = true;
                break;
            }
        }
    }
    listingStore.gettimeslotsbyday(listingStore.selectedListing.listing.UserID)

})

async function SwitchMonth(direction) {
    if (direction == 'next') {
        listingStore.dateobject.realCurrentDate.setMonth(listingStore.dateobject.realCurrentDate.getMonth() + 1);
    } else {
        listingStore.dateobject.realCurrentDate.setMonth(listingStore.dateobject.realCurrentDate.getMonth() - 1);
    }
    let weeknumbers = GetAllPossibleWeeksInCurrentMonth(listingStore.dateobject.realCurrentDate);
    let year = GetYear(listingStore.dateobject.realCurrentDate);
    days.value = GetDatesOfWeeksFromWeekNumber(weeknumbers, year, listingStore.dateobject.realCurrentDate)

    let datestocheck = days.value.map((day) => day.date);
    let availableSlots = await $fetch(`/api/availability/getavailableslots?ownerid=${listingStore.selectedListing.listing.UserID}&start=${datestocheck[0]}&end=${datestocheck[datestocheck.length - 1]}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } 
    });

    for (let i = 0; i < availableSlots.timeslots.length; i++){
        let date = availableSlots.timeslots[i].split(' ')[0]; 
        for(let j = 0; j < days.value.length; j++){
            if (days.value[j].date == date) {
                days.value[j].hasSlots = true;
                break;
            }
        }
    }
}

let defaulttimeslot = {
    ID: 0,
    Title: '',
    StartDate: '',
    EndDate: ''
}


</script>

<template>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:flex-row flex-col">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:min-w-[80vh] min-w-full">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Selecteer  een tijdslot
                            </h3>
                            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="listingStore.openDatePicker = false" />
                        </div>
                    </template>

                    <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                        <div class="md:pr-14">
                            <div class="flex items-center">
                                <h2 class="flex-auto text-sm font-semibold text-gray-900">{{ GetMonth(listingStore.dateobject.realCurrentDate)}} {{ GetYear(listingStore.dateobject.realCurrentDate) }}</h2>
                                <button type="button" class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" @click="SwitchMonth('previous')">
                                    <span class="sr-only">Previous month</span>
                                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button type="button" class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" @click="SwitchMonth('next')">
                                    <span class="sr-only">Next month</span>
                                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                                <div>Ma</div>
                                <div>Di</div>
                                <div>Wo</div>
                                <div>Do</div>
                                <div>Vr</div>
                                <div>Za</div>
                                <div>Zo</div>
                            </div>
                            <div class="mt-2 grid grid-cols-7 text-sm">
                                <div v-for="(day, dayIdx) in days" :key="day.date" :class="[dayIdx > 6 && 'border-t border-gray-200', 'py-2']">
                                    <button @click="listingStore.selectedTimeSlot = defaulttimeslot, listingStore.dateobject.selectedDate = day.date, listingStore.gettimeslotsbyday(listingStore.selectedListing.listing.UserID)" type="button" class="h-8 w-8" :class="day.isCurrentMonth ? 'font-semibold' : 'text-gray-500', day.isToday ? 'text-green-600' : null, day.date == listingStore.dateobject.selectedDate ? 'bg-green-500 text-white flex h-8 w-8 items-center justify-center rounded-full': null">
                                        <!-- 'mx-auto flex h-8 w-8 items-center justify-center rounded-full' -->
                                        <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                                        <div v-show="!day.isToday && day.hasSlots && day.date != listingStore.dateobject.selectedDate" class="bg-green-600 w-1 h-1 rounded mx-auto"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <section class="mt-12 md:mt-0 md:pl-6">
                            <div class="h-[80%]">
                                <h2 class="text-base font-semibold leading-6 text-gray-900 md:pl-4">Beschikbare tijden, <time > {{ listingStore.dateobject.selectedDate }} </time></h2>

                                <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                    <template v-for="timeslot in listingStore.retrievedTimeslots" :key="timeslot.ID">
                                        <li @click="listingStore.selectedTimeSlot = timeslot" :class="listingStore.selectedTimeSlot == timeslot ? 'bg-gray-200' : null" class="cursor-pointer group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100">
                                            <div class="flex-auto">
                                                <p class="text-gray-900" v-if="timeslot.Title != ''">{{ timeslot.Title }}</p>
                                                <p class="text-gray-900" v-else>Beschikbaar Tijdslot</p>

                                                <p class="mt-0.5">
                                                    <time :datetime="timeslot.StartDate">{{ GetTime(timeslot.StartDate) }}</time> -
                                                    <time :datetime="timeslot.EndDate">{{ GetTime(timeslot.EndDate) }}</time>
                                                </p>
                                            </div>
                                        </li>
                                    </template>
                                    <div v-if="listingStore.retrievedTimeslots == null || listingStore.retrievedTimeslots.length == 0 ">
                                        <p class="pl-4">Niks gevonden</p>
                                    </div>
                                </ol>
                            </div>
                            <div class="h-[10%]  ">
                                <UButton v-if="listingStore.selectedTimeSlot.StartDate != ''" color="green" class="mt-4" @click="listingStore.openDatePicker = false">Bevestigen</UButton>
                            </div>

                        </section>
                    </div>


                </UCard>
            </div>
        </div>
    </div>
</div>
</template>