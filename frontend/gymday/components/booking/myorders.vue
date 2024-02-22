
<script setup>
import useBookingStore from  '~/stores/booking';
import BookingModal from '~/components/booking/bookingModal.vue';
import { LifebuoyIcon } from '@heroicons/vue/20/solid';

const bookingStore = useBookingStore();
await bookingStore.getMyOrders()

function formatDate(startdate, enddate) {
    // get a startdate like : 2022-12-31 14:00
    // get a enddate like : 2022-12-31 16:00

    // return 022-12-31 14:00 - 16:00
    enddate.split(' ')[1]

    return startdate.split(' ')[0] + ' ' + startdate.split(' ')[1] + ' - ' + enddate.split(' ')[1]
}

</script>

<template>

    <div class="flex justify-center align-middle item-center ">
        <div class="flex flex-col w-[90%]">
            <div class=" w-full">
                <div class="flow-root">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">Bestellingen</h1>
                            <p class="mt-2 text-sm text-gray-700">Een lijst met al jouw bestellingen.</p>
                        </div>

                    </div>
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300 overflow-auto max-h-[60vh]">
                            <thead>
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Product Naam</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Datum en tijd</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prijs</th>
                                <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">Actie <span class="sr-only">Open</span></th> -->
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white ">
                            <tr v-for="booking in bookingStore.myorders" :key="booking.ID">
                                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-11 w-11 flex-shrink-0">
                                            <LifebuoyIcon class="h-11 w-11 rounded-full bg-gray-100 p-2 text-gray-500" aria-hidden="true" />
                                        </div>
                                        <div class="ml-4">
                                            <NuxtLink :to="'/listing/'+booking.Listing.ID">
                                                <div class="font-medium text-gray-900">{{booking.Listing.Title}}</div>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </td>

                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{booking.Status}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{formatDate(booking.TimeslotStartDate, booking.TimeslotEndDate)}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{booking.Price}}</span>
                                </td>
                                <!-- <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <UButton  @click="bookingStore.bookingModal = true, bookingStore.selectedBooking = booking">Beheer booking</UButton>
                                    <BookingModal v-if="bookingStore.bookingModal"/>

                                </td> -->
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>