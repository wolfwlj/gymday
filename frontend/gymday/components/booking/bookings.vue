<script setup>
import useBookingStore from  '~/stores/booking';
import BookingModal from '~/components/booking/bookingModal.vue';
import { storeToRefs } from "pinia";
import createbookingModal from './createbookingModal.vue';



const bookingStore = useBookingStore();
await bookingStore.getBookings()

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day
    if (hour.length < 2)
        hour = '0' + hour
    if (minutes.length < 2)
        minutes = '0' + minutes

    return [day, month, year].join('-') + ' ' + [hour, minutes].join(':')
}

</script>

<template>

    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[90%]">
            <div class=" w-full">
                <div class="flow-root">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">Bookingen</h1>
                            <p class="mt-2 text-sm text-gray-700">Een lijst met al jouw bookingen.</p>
                        </div>
                        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <UButton variant="outline" color="black" @click="bookingStore.addbookingModal=true">Voeg handmatig een booking toe</UButton>
                            <createbookingModal v-if="bookingStore.addbookingModal"/>
                        </div>
                    </div>
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Datum en tijd</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tel.</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Listing</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">Actie <span class="sr-only">Open</span></th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="booking in bookingStore.bookings" :key="booking.ID">
                                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-11 w-11 flex-shrink-0">
                                            <img class="h-11 w-11 rounded-full" v-if="booking.User.ProfilePicture" :src="booking.User.ProfilePicture" alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900">{{ booking.User.FirstName }}</div>
                                            <div class="mt-1 text-gray-500">{{ booking.User.LastName }}</div>
                                        </div>
                                    </div>
                                </td>

                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{booking.Status}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{formatDate(booking.StartDate)}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{booking.User.PhoneNumber}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">{{booking.Title}}</span>
                                </td>
                                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <UButton  @click="bookingStore.bookingModal = true, bookingStore.selectedBooking = booking">Beheer booking</UButton>
                                    <BookingModal v-if="bookingStore.bookingModal"/>

                                </td>
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