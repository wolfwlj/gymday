
<script setup>
import useBookingStore from '~/stores/booking';
const bookingStore = useBookingStore();

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
    <UModal v-model="bookingStore.bookingModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Booking Aanvraag van {{bookingStore.selectedBooking.User.FirstName}} {{bookingStore.selectedBooking.User.LastName}}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="bookingStore.bookingModal = false" />
                </div>
            </template>
            <div class="">

                <div>
                    <p>Naam : {{ bookingStore.selectedBooking.User.FirstName }} {{ bookingStore.selectedBooking.User.LastName }}</p>
                    <p>Tijd voorkeur : {{ formatDate(bookingStore.selectedBooking.StartDate) }}</p>
                    <p>Telefoon nummer : {{ bookingStore.selectedBooking.User.PhoneNumber }}</p>
                    <p>Email : {{ bookingStore.selectedBooking.User.Email }}</p>
                    <p class="font-bold">Status : {{  bookingStore.selectedBooking.Status }}</p>
                </div>
                <div class="mt-2">
                    <p class="text-md text-gray-700">Beslis wat je wilt doen met deze boeking, bel of email de klant om een afspraak uit te werken.
                        Update hierna de status van de boeking.
                        De klant ontvangt een email met de update.
                    </p>
                </div>

                <div class="flex justify-between">
                    <UButton @click="bookingStore.UpdateBooking('Accepted')" class="mt-4">Accepteer booking</UButton>
                    <UButton @click="bookingStore.UpdateBooking('Completed')" color="blue" variant="ghost" class="mt-4">Booking afgerond</UButton>
                    <UButton @click="bookingStore.UpdateBooking('Declined')" color="red" variant="ghost" class="mt-4">Annuleer booking</UButton>
                </div>
                

            </div>
        </UCard>
    </UModal>
</template>