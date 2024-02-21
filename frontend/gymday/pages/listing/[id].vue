<script setup>
import { StarIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import {
    FaceFrownIcon,
    FaceSmileIcon as FaceSmileIconMini,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    XMarkIcon,
} from '@heroicons/vue/20/solid'
import ListingReviews from '~/components/listing/listingreviews.vue'
import { baseURL } from '../../api'
import useListingStore from '~/stores/listingstore'
import useAuthStore from '~/stores/auth'
import imagemodal from '~/components/listing/modals/imagemodal.vue'
import useBookingStore from '~/stores/booking'
import bookappointment from '~/components/listing/modals/bookappointment.vue'

const hover = ref(1)

const { id } = useRoute().params
const listingstore = useListingStore()
const authstore = useAuthStore()
const bookingstore = useBookingStore()

const { data: listing } = await useFetch(`${baseURL}/user/listing/${id}`, {
    method: 'get',
    credentials: 'include',
})

const WriteReview = ref({
    Body: '',
    Rating: 1,
})

async function SubmitReview() {

    await listingstore.submitReview(id, WriteReview.value.Rating, WriteReview.value.Body)
    WriteReview.value.Body = ''
    WriteReview.value.Rating = 1
    hover.value = 1
}

const booking = ref({
    Date: '',
    Time: '',
})

function convertTohighestRating(rating) {
    return Math.round(rating)
}

listingstore.selectedTimeSlot = { 
    StartDate: '',
    StartTime: '',
    EndDate: '',
    EndTime: '',
} 


</script>

<template>
    <imagemodal v-if="listingstore.imageModal" />
    <div class="pt-6">
        <div :class="listing.listing.Images.length > 1 ? '' : 'bg-gray-50'">
            <!-- <div v-if="listing.listing.Images.length == 3" class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 rounded-lg">
                <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg" :class="listing.listing.Images.length > 1 ? 'col-start-1' : 'col-start-2'">
                    <img :src="listing.listing.Images[0].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[0].ImageURL, listingstore.imageModal = true">
                </div>
            </div> -->

            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:gap-x-8 lg:px-8 rounded-lg" :class="listing.listing.Images.length == 3 ? 'grid-cols-5' : 'grid-cols-3'" >
                <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg col-start-2 col-span-2" v-if="listing.listing.Images.length == 3">
                    <img :src="listing.listing.Images[0].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[0].ImageURL, listingstore.imageModal = true">
                </div>

                <div v-else class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg" :class="listing.listing.Images.length > 1 ? 'col-start-1' : 'col-start-2'">
                    <img :src="listing.listing.Images[0].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[0].ImageURL, listingstore.imageModal = true">
                </div>
                <div v-if="listing.listing.Images.length === 2" class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img :src="listing.listing.Images[1].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[1].ImageURL, listingstore.imageModal = true">
                </div>

                <div v-if="listing.listing.Images.length == 3" class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8 col-start-4">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[1].ImageURL" 
                            class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[1].ImageURL, listingstore.imageModal = true">
                    </div>

                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[2].ImageURL" 
                            class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[2].ImageURL, listingstore.imageModal = true">
                    </div>
                </div>

                <div v-if="[4, 5].includes(listing.listing.Images.length)" class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[1].ImageURL" 
                            class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[1].ImageURL, listingstore.imageModal = true">
                    </div>

                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[2].ImageURL" 
                            class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[2].ImageURL, listingstore.imageModal = true">
                    </div>
                </div>
                <div v-if="listing.listing.Images.length === 4"
                    class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img :src="listing.listing.Images[3].ImageURL" 
                        class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[3].ImageURL, listingstore.imageModal = true">
                </div>
                <div v-if="listing.listing.Images.length >= 5" class="relative hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[3].ImageURL" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[3].ImageURL, listingstore.imageModal = true">
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="listing.listing.Images[4].ImageURL" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[4].ImageURL, listingstore.imageModal = true">
                    </div>
                    <div class="absolute bottom-5 right-5">
                        <UButton
                            icon="i-heroicons-view-columns"
                            size="sm"
                            color="black"
                            variant="solid"
                            @click="listingstore.imageModal = true, listingstore.selectedimg = listing.listing.Images"
                            label="Alle foto's tonen"
                            :trailing="false"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            class="mx-auto max-w-2xl pb-12 pt-10  lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-18 lg:pt-16">
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ listing.listing.Title }}</h1>
                <div class="text-gray-500 w-[20%]">
                    <NuxtLink class="text-lg" :to="`../profile/${listing.listing.User.ID}`">
                        <a href="#" class="block hover:text-gray-400">{{ listing.listing.User.FirstName }} {{
                            listing.listing.User.LastName }}</a>
                    </NuxtLink>
                </div>
            </div>
            <div class="mt-4 lg:row-span-3 lg:mt-0 lg:sticky top-20 overflow-hidden h-fit">
                <p class="text-3xl tracking-tight text-gray-900">&euro;{{ listing.listing.Price }} / training</p>
                <div class="mt-6">
                    <h3 class="sr-only">Reviews</h3>
                    <div class="flex items-center">
                        <div class="flex items-center">
                            <StarIcon v-for="rating in [1, 2, 3, 4, 5]" :key="rating"
                                :class="[convertTohighestRating(listing.listing.AverageRating) >= rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                aria-hidden="true" />
                        </div>
                        <p class="sr-only">{{ convertTohighestRating(listing.listing.AverageRating)}} out of 5 stars</p>
                        <a href="#reviews" class="ml-3 text-sm font-medium text-green-600 hover:text-green-500">{{
                            listing.listing.AmountOfReviews  }} reviews</a>
                    </div>
                </div>

                <form class="mt-10">    

                    <div class="mt-10 space-y-2">
                        <p class="block text-sm font-medium text-gray-700">Bekijk beschikbare tijdsloten</p>
                        <label for="date" class="block text-sm font-medium text-gray-700">Geselecteerd tijdslot</label>
                        <div class="px-[2px]" @click="listingstore.openDatePicker = true, listingstore.selectedListing = listing">
                            <UInputMenu v-model="listingstore.selectedTimeSlot.StartDate"/>
                        </div>
                        <bookappointment v-if="listingstore.openDatePicker" />
                    </div>

                    <button @click="bookingstore.createBooking(id, booking.Date, booking.Time, listingstore.selectedTimeSlot.ID)" type="button"
                        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Afspraak boeken
                    </button>
                </form>
            </div>

            <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div class="mb-10 flex flex-col gap-3">
                    <div class="flex gap-2">
                        <span v-for="tag in listing.listing.Tags" class="rounded bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 shadow-sm">{{ tag.Name }}</span>
                    </div>
                    <h3 class="sr-only">Omschrijving</h3>
                    <div class="space-y-6">
                        <p class="text-base text-gray-900">{{ listing.listing.Description }}</p>
                    </div>
                </div>

                <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                    <div class="flex border-t border-gray-200 pt-10 items-start space-x-4 mb-8">
                        <div class="flex-shrink-0">
                            <img class="inline-block h-10 w-10 rounded-full"
                                v-if="authstore.user?.ProfilePicture && authstore.user.ProfilePicture !== ''"
                                :src="authstore.user.ProfilePicture" alt="" />
                            <UserIcon v-else class="inline-block h-10 w-10 rounded-full text-gray-500/50" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="border-b border-gray-200 focus-within:border-green-600">
                                <label for="comment" class="sr-only">Voeg een recensie toe</label>
                                <textarea rows="3" name="comment" id="comment" v-model="WriteReview.Body"
                                    class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Voeg een recensie toe..." />
                            </div>
                            <div class="flex justify-between pt-2">
                                <div class="flex items-center space-x-5">

                                    <div class="flex">
                                        <StarIcon v-for="rating in [1, 2, 3, 4, 5]" :key="rating"
                                            :class="[hover >= rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0 cursor-pointer']"
                                            aria-hidden="true" @click="WriteReview.Rating = rating"
                                            @mouseout="hover = WriteReview.Rating" @mouseover="hover = rating" />
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <UButton color="white" variant="solid" @click="SubmitReview"
                                        >Plaatsen</UButton>

                                </div>
                            </div>
                        </div>
                    </div>
                    <TabGroup as="div">
                        <div class="border-b border-gray-200" id="reviews">
                            <TabList class="-mb-px flex space-x-8">
                                <Tab as="template" v-slot="{ selected }">
                                    <button
                                        :class="[selected ? 'border-green-600 text-green-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Klanten
                                        Reviews</button>
                                </Tab>
                                <Tab as="template" v-slot="{ selected }">
                                    <button
                                        :class="[selected ? 'border-green-600 text-green-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">FAQ</button>
                                </Tab>
                                <Tab as="template" v-slot="{ selected }">
                                    <button
                                        :class="[selected ? 'border-green-600 text-green-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">License</button>
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanels as="template" >
                            <TabPanel class="-mb-10" >
                                <!-- <TabPanel class="-mb-10 overflow-y-scroll no-scrollbar h-96"> -->
                                <h3 class="sr-only">Klanten Reviews</h3>

                                <ListingReviews />
                            </TabPanel>

                            <TabPanel class="text-sm text-gray-500">
                                <h3 class="sr-only">Frequently Asked Questions</h3>

                                <dl>
                                    <template v-for="faq in faqs" :key="faq.question">
                                        <dt class="mt-10 font-medium text-gray-900">{{ faq.question }}</dt>
                                        <dd class="prose prose-sm mt-2 max-w-none text-gray-500">
                                            <p>{{ faq.answer }}</p>
                                        </dd>
                                    </template>
                                </dl>
                            </TabPanel>

                            <TabPanel class="pt-10">
                                <h3 class="sr-only">License</h3>

                                <div class="prose prose-sm max-w-none text-gray-500" v-html="license.content" />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
    </div>
</div></template>
