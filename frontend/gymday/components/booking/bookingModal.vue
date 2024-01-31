
<script setup>
import useBookingStore from '~/stores/booking';
const bookingStore = useBookingStore();


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
                    <p>Telefoon nummer : {{ bookingStore.selectedBooking.User.PhoneNumber }}</p>
                    <p>Email : {{ bookingStore.selectedBooking.User.Email }}</p>
                </div>

                <div class="flex justify-between">
                    <UButton class="mt-4">Accepteer booking</UButton>
                    <UButton  color="red" variant="ghost" class="mt-4">Annuleer booking</UButton>
                </div>
                

            </div>
        </UCard>
    </UModal>
</template>