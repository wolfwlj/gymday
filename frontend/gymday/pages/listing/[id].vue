<script setup>
import { StarIcon, UserIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
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
import imagemodal from '~/components/listing/imagemodal.vue'

const hover = ref(1)
const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-22', isCurrentMonth: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const { id } = useRoute().params
const listingstore = useListingStore()
const authstore = useAuthStore()

const { data: listing } = await useFetch(`${baseURL}/user/listing/${id}`, {
    method: 'get',
    credentials: 'include',
})

const WriteReview = ref({
    Body: '',
    Rating: 1,
})

async function SubmitReview() {
    console.log(WriteReview)

    await listingstore.submitReview(id, WriteReview.value.Rating, WriteReview.value.Body)
    WriteReview.value.Body = ''
    WriteReview.value.Rating = 1

}
</script>

<template>
    <imagemodal v-if="listingstore.imageModal" />
    <div class="pt-6">
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 rounded-lg"
            :class="listing.listing.Images.length > 1 ? '' : 'bg-gray-50'">
            <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
                :class="listing.listing.Images.length > 1 ? 'col-start-1' : 'col-start-2'">
                <img :src="listing.listing.Images[0].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[0].ImageURL, listingstore.imageModal = true">
            </div>
            <div v-show="listing.listing.Images.length === 2"
                class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img :src="listing.listing.Images[1].ImageURL" alt="" class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[1].ImageURL, listingstore.imageModal = true">
            </div>
            <div v-if="[3, 4, 5].includes(listing.listing.Images.length)" class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img :src="listing.listing.Images[1].ImageURL" alt="Model wearing plain black basic tee."
                        class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[1].ImageURL, listingstore.imageModal = true">
                </div>

                <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img :src="listing.listing.Images[2].ImageURL" alt="Model wearing plain gray basic tee."
                        class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[2].ImageURL, listingstore.imageModal = true">
                </div>
            </div>
            <div v-if="listing.listing.Images.length === 4"
                class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img :src="listing.listing.Images[3].ImageURL" alt="Model wearing plain gray basic tee."
                    class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[3].ImageURL, listingstore.imageModal = true">
            </div>
            <div v-if="listing.listing.Images.length === 5" class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img :src="listing.listing.Images[3].ImageURL"
                        alt="Model wearing plain black basic tee." class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[3].ImageURL, listingstore.imageModal = true">
                </div>
                <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img :src="listing.listing.Images[4].ImageURL"
                        alt="Model wearing plain gray basic tee." class="h-full w-full object-cover object-center aspect-block cursor-pointer" @click="listingstore.selectedimg = listing.listing.Images[4].ImageURL, listingstore.imageModal = true">
                </div>
            </div>
        </div>
        <div
            class="mx-auto max-w-2xl  pb-16 pt-10  lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-16">
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
                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                :class="[reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                aria-hidden="true" />
                        </div>
                        <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
                        <a :href="reviews.href" class="ml-3 text-sm font-medium text-green-600 hover:text-green-500">{{
                            reviews.totalCount }} reviews</a>
                    </div>
                </div>
                <!-- 
                <div class="mt-10 border-t border-gray-200 pt-10">
                    <div class="md:pr-14">
                        <div class="flex items-center">
                            <h2 class="flex-auto text-sm font-semibold text-gray-900">January 2022</h2>
                            <button type="button"
                                class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Previous month</span>
                                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button type="button"
                                class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Next month</span>
                                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                            <div>S</div>
                        </div>
                        <div class="mt-2 grid grid-cols-7 text-sm">
                            <div v-for="(day, dayIdx) in days" :key="day.date"
                                :class="[dayIdx > 6 && 'border-t border-gray-200', 'py-2']">
                                <button type="button"
                                    :class="[day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-green-600', !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900', !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400', day.isSelected && day.isToday && 'bg-green-600', day.isSelected && !day.isToday && 'bg-gray-900', !day.isSelected && 'hover:bg-gray-200', (day.isSelected || day.isToday) && 'font-semibold', 'mx-auto flex h-8 w-8 items-center justify-center rounded-full']">
                                    <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->

                <form class="mt-10">

                    <div class="mt-10 space-y-2">

                        <p class="block text-sm font-medium text-gray-700">Afpspraak tijd voorkeur</p>

                        <label for="date" class="block text-sm font-medium text-gray-700">Datum</label>
                        <div class="mt-1">
                            <input type="date" name="date" id="date"
                                class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <label for="time" class="block text-sm font-medium text-gray-700">Tijd</label>
                        <div class="mt-1">
                            <input type="time" name="time" id="time"
                                class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <button type="submit"
                        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Training
                        boeken</button>
                </form>
            </div>

            <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div class="mb-10">
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
                                    <button @click="SubmitReview"
                                        class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TabGroup as="div">
                        <div class="border-b border-gray-200">
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
                        <TabPanels as="template">
                            <TabPanel class="-mb-10">
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
