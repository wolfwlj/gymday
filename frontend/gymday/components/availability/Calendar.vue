
<script setup>
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { GetTime, GetMondayOfWeek, GetSundayOfWeek, GetCurrentWeekNumber, GetYear, GetMonth, GetDayOfWeek, GetMinuteCount, RetrieveTimestamp, GetWeekDates, GetCurrentWeekDayDateNumber } from "../../utils/datefunctions";
import useAvailabilityStore from "../../stores/availability";
import CreateTimeSlotModal from "./CreateTimeSlotModal.vue";

const availabilityStore = useAvailabilityStore()
const container = ref(null)
const containerNav = ref(null)
const containerOffset = ref(null)
const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"]

onMounted(async () => {
    let MyTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // get current date with MyTimezone
    let CurrentDate = new Date().toLocaleString("nl-NL", { timeZone: MyTimezone })
    //CurrentDate needs to be year-month-day

    let formattedDate = CurrentDate.split(" ")[0].split("-")
    let formattedTime = CurrentDate.split(" ")[1].split("-")

    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]
    formattedTime = formattedTime[0]

    let completeDate = formattedDate + " " + formattedTime

    let start = GetMondayOfWeek(formattedDate)
    let end = GetSundayOfWeek(formattedDate)

    let computedmonth;

    if (GetMonth(start) != GetMonth(end)){
        computedmonth = GetMonth(start) + "/" + GetMonth(end)
    } else {
        computedmonth = GetMonth(start)
    }

    let weekdates = GetWeekDates(completeDate)

    availabilityStore.dateobject = {
        realCurrentDate : CurrentDate,
        rawdate : completeDate,
        startdate: start,
        enddate: end,
        weeknumber : GetCurrentWeekNumber(start),
        currentWeekNumber : GetCurrentWeekNumber(start),
        dayNumber : GetCurrentWeekDayDateNumber(completeDate),
        year : GetYear(start),
        monthname : computedmonth,
        weekdates : weekdates

    }

    await availabilityStore.GetTimeSlotsByOwner(start, end);

    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60

    container.value.scrollTop =
        ((container.value.scrollHeight - containerNav.value.offsetHeight - containerOffset.value.offsetHeight) *
        currentMinute) /
        1440
})

async function GoToToday(){
    let MyTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // get current date with MyTimezone
    let CurrentDate = new Date().toLocaleString("nl-NL", { timeZone: MyTimezone })
    //CurrentDate needs to be year-month-day

    let formattedDate = CurrentDate.split(" ")[0].split("-")
    let formattedTime = CurrentDate.split(" ")[1].split("-")

    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]
    formattedTime = formattedTime[0]

    let completeDate = formattedDate + " " + formattedTime

    let start = GetMondayOfWeek(formattedDate)
    let end = GetSundayOfWeek(formattedDate)

    let computedmonth;

    if (GetMonth(start) != GetMonth(end)){
        computedmonth = GetMonth(start) + "/" + GetMonth(end)
    } else {
        computedmonth = GetMonth(start)
    }

    let weekdates = GetWeekDates(completeDate)

    availabilityStore.dateobject = {
        realCurrentDate : CurrentDate,
        rawdate : completeDate,
        startdate: start,
        enddate: end,
        weeknumber : GetCurrentWeekNumber(start),
        currentWeekNumber : GetCurrentWeekNumber(start),
        dayNumber : GetCurrentWeekDayDateNumber(completeDate),
        year : GetYear(start),
        monthname : computedmonth,
        weekdates : weekdates

    }

    await availabilityStore.GetTimeSlotsByOwner(start, end);
    
 
}


async function GetNextWeek(direction){
    // availabilityStore.calendarEnrollments = []
    let date = new Date(availabilityStore.dateobject.rawdate)

    if (direction == "next"){
        date.setDate(date.getDate() + 7);
    } else {
        date.setDate(date.getDate() - 7);
    }

    let start = GetMondayOfWeek(date)
    let end = GetSundayOfWeek(date)

    availabilityStore.dateobject.weeknumber = GetCurrentWeekNumber(start)
    availabilityStore.dateobject.year = GetYear(start)

    if(availabilityStore.dateobject.weeknumber == availabilityStore.dateobject.currentWeekNumber){
        console.log("in current week")
        availabilityStore.dateobject.InCurrentWeek = true
    } else {
        availabilityStore.dateobject.InCurrentWeek = false

    }

    let computedmonth;
    if (GetMonth(start) != GetMonth(end)){
        computedmonth = GetMonth(start) + "/" + GetMonth(end)
    } else {
        computedmonth = GetMonth(start)
    }

    availabilityStore.dateobject.monthname = computedmonth
    availabilityStore.dateobject.rawdate = date
    availabilityStore.dateobject.startdate = start
    availabilityStore.dateobject.enddate = end

    let weekdates = GetWeekDates(date)
    availabilityStore.dateobject.weekdates = weekdates

    await availabilityStore.GetTimeSlotsByOwner(start, end);
    

}

function CalcTimeToCalendarHeight(start, end){

    let startminutecount = GetMinuteCount(start)
    let endminutecount = GetMinuteCount(end)

    let difference = 0 + endminutecount

    let height = difference - startminutecount

    // if number is negative, make it positive
    if (height < 0){
        height = height * -1
    }


    let calculatedheight = height / 5

    // make sure all the values are integers
    calculatedheight = Math.floor(calculatedheight)
    console.log(calculatedheight)

    return calculatedheight
}   

function CalcTimeToCalendarPosition(start){

    let startminutecount = GetMinuteCount(start)

    let calculatedstartminutes = startminutecount / 5
    // make sure all the values are integers
    calculatedstartminutes = Math.floor(calculatedstartminutes)
    console.log(calculatedstartminutes)
    return calculatedstartminutes
}   

</script>

<template>
    <div class="flex h-full flex-col">

        <header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">

            <h1 class="text-base font-semibold leading-6 text-gray-900">
                <time >{{availabilityStore.dateobject.monthname}} {{availabilityStore.dateobject.year }}</time>


            </h1>
            <div class="flex items-center">
                <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                    <button v-on:click="GetNextWeek('previous')" type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block" v-on:click="GoToToday()">Vandaag</button>
                    <span  class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                    <button type="button" v-on:click="GetNextWeek('next')" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                        <span class="sr-only">Next week</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    
                </div>
                <div class="hidden md:ml-4 md:flex md:items-center">
                    <div class="ml-6 h-6 w-px bg-gray-300" />
                    <button type="button" @click="availabilityStore.createTimeSlotModal = true" class="ml-6 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">Voeg Beschikbaarheid toe</button>
                    <CreateTimeSlotModal v-if="availabilityStore.createTimeSlotModal" />
                </div>
                <Menu as="div" class="relative ml-6 md:hidden">
                    <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Open menu</span>
                        <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
        
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="availabilityStore.createTimeSlotModal = true">Voeg Beschikbaarheid toe</a>
                        </MenuItem>
                        </div>
                        <div class="py-1">
                        <MenuItem v-slot="{ active }">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" v-on:click="GoToToday()">Go to today</a>
                        </MenuItem>
                        </div>
                    </MenuItems>
                    </transition>
                </Menu>
            </div>
        </header>
        <div ref="container" class="isolate flex flex-auto flex-col overflow-auto bg-white h-[70vh]">
            <div style="width: 165%" class="flex max-w-full flex-none flex-col ">
                <div ref="containerNav" class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
                    <div class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                    </div>
        
                    <div class="-mr-px  grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 grid">
                        <div class="col-end-1 w-14" />
                        <div v-for="weekday, i in weekdays">
                            <div class="flex items-center justify-center py-3 ">
                                <span class="flex flex-col justify-center align-middle sm:flex-row sm:space-x-2 sm:space-y-0 space-y-1 items-baseline"  v-if="availabilityStore.dateobject.weekdates[i] == availabilityStore.dateobject.dayNumber && availabilityStore.dateobject.weeknumber == availabilityStore.dateobject.currentWeekNumber" >
                                    <p class="mx-auto">
                                        {{ weekday }} 
                                    </p>
                                    <span class="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 font-semibold text-white" >
                                        {{ availabilityStore.dateobject.weekdates[i] }}
                                    </span>
                                    
                                </span>
                                <span v-else class="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 space-y-1">
                                    <p>{{ weekday }}</p>
                                    <span class="items-center justify-center font-semibold text-gray-900">{{ availabilityStore.dateobject.weekdates[i] }}</span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="flex flex-auto">
                    <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
                    <div class="grid flex-auto grid-cols-1 grid-rows-1">
                        <!-- Horizontal lines -->
                        <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
                            <div ref="containerOffset" class="row-end-1 h-7" />
                            <template v-for="i in 24">
                                <div >
                                    <div  class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">{{ i -1 }}:00</div>
                                </div>
                                <div />
                            </template>
                            <div />
                        </div>
            
                        <!-- Vertical lines -->
                        <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100  sm:grid-cols-7">
                            <div class="col-start-1 row-span-full" />
                            <div class="col-start-2 row-span-full" />
                            <div class="col-start-3 row-span-full" />
                            <div class="col-start-4 row-span-full" />
                            <div class="col-start-5 row-span-full" />
                            <div class="col-start-6 row-span-full" />
                            <div class="col-start-7 row-span-full" />
                            <div class="col-start-8 row-span-full w-8" />
                        </div>
            
                        <!-- Events -->
                        <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-7 sm:pr-8" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                            <li class="relative mt-px flex sm:col-start-3" style="grid-row: 92 / span 30">
                            <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-50 p-2 text-xs leading-5 hover:bg-green-100">
                                <p class="order-1 font-semibold text-green-700">Flight to Paris</p>
                                <p class="text-green-500 group-hover:text-green-700">
                                <time datetime="2022-01-12T07:30">7:30 AM</time>
                                </p>
                            </a>
                            </li>
                            <template v-for="timeslot in availabilityStore.timeslots">

                                <li :class="`col-start-${GetDayOfWeek(timeslot.StartDate)}`" class="relative mt-px flex " :style="`grid-row: ${CalcTimeToCalendarPosition(timeslot.StartDate)} / span ${CalcTimeToCalendarHeight(timeslot.StartDate, timeslot.EndDate)}`">
                                    <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-50 p-2 text-xs leading-5 hover:bg-green-100">
                                        <p class="order-1 font-semibold text-gray-700">Beschikbaar tijdvak</p>
                                        <p class="text-gray-500 group-hover:text-gray-700">
                                            <time datetime="">{{GetTime(timeslot.StartDate)}}</time>
                                        </p>
                                    </a>
                                </li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
