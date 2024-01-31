<script setup>
import { baseURL } from '../../api';
import { StarIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/vue/24/outline"
import useListingStore from '~/stores/listingstore';

const { id } = useRoute().params
const sessioncount = ref(1)
const listingstore = useListingStore()

const { data: listing } = await useFetch(`${baseURL}/user/listing/${id}`, {
    method: 'get',
    credentials: 'include',
})

const WriteReview = ref({
    Rating: "1",
    Body: "",
    ListingID: id,
})

async function SubmitReview() {
    const { data, status } = await useFetch(`${baseURL}/user/review`, {
        method: 'post',
        body: {
            Body: WriteReview.value.Body,
            Rating: WriteReview.value.Rating,
            ListingID: WriteReview.value.ListingID,
        },
        credentials: 'include',
    })
    if (status.value == 'success') {

    } else {
        alert("Er is iets mis gegaan met het plaatsen van je recensie")
    }
}

const hover = ref(1)
</script>

<template>
    <div class="flex justify-center mb-[20%]">
        <div class="w-[60%]">
            <div class="w-[100%] mt-2 mb-4">
                <p class="text-3xl font-semibold">{{ listing.listing.Title }}</p>
                <div class="flex items-center">
                    <StarIcon class="w-8 h-8" />
                    <p class="text-lg">4.7/5 | 99999 recencies </p>
                </div>
            </div>

            <div class="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-3">
                <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-4 lg:grid-rows-1 col-span-6">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-l-lg  ">
                        <img :src="listing.listing.Images[0].ImageURL" alt="listingpicigeuss"
                            class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
                <div class="hidden lg:grid lg:grid-cols-1 col-span-3 lg:grid-rows-2 lg:gap-y-4">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden ">
                        <img :src="listing.listing?.Images[1].ImageURL" alt="listingpicigeuss"
                            class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden ">
                        <img :src="listing.listing?.Images[2].ImageURL" alt="listingpicigeuss"
                            class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
                <div class="hidden lg:grid lg:grid-cols-1 col-span-3 lg:grid-rows-2 lg:gap-y-4">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-tr-lg ">
                        <img :src="listing.listing?.Images[3].ImageURL" alt="listingpicigeuss"
                            class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-br-lg">
                        <img :src="listing.listing?.Images[3].ImageURL" alt="listingpicigeuss"
                            class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
            </div>

            <div class="flex flex-row pt-8">
                <div class="mt-2 mb-4 w-[70%]">
                    <div class="w-[100%] ">
                        <div class="text-gray-500 w-[20%]">
                            <NuxtLink class="text-lg" :to="`../profile/${listing.listing.User.ID}`">
                                <a href="#" class="block hover:text-gray-400">{{ listing.listing.User.FirstName }} {{
                                    listing.listing.User.LastName }}</a>
                            </NuxtLink>
                        </div>
                        <p class="text-2xl font-semibold">Personal Training</p>
                        <p class="text-lg ">Beschikbaarheid : maandag, dinsdag, woensdag</p>
                    </div>
                    <hr class="mr-10 mt-4 mb-4">
                    <div class="w-[100%] mt-2 mb-4 space-y-4">
                        <div class="flex space-x-2 items-center">
                            <PhoneIcon class="w-8 h-8" />
                            <p class="text-lg">{{ listing.listing.User.PhoneNumber }}</p>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <EnvelopeIcon class="w-8 h-8" />
                            <p class="text-lg">{{ listing.listing.User.Email }}</p>
                        </div>
                        <div>
                            <p class="w-[90%]">
                            <p class="text-lg">{{ listing.listing.Description }}</p>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt-2 mb-4 w-[30%] rounded-xl p-8 drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)] bg-white">
                    <div class="">
                        <div class="flex inline-block align-baseline flex-start">
                            <div class="">
                                <span class="text-3xl font-semibold">
                                    &euro; {{ listing.listing.Price }}
                                </span>
                                <span class="text-lg ">
                                    / training
                                </span>
                            </div>
                        </div>
                        <hr class="mr-10 mt-4 mb-4">
                        <div class="flex justify-around">
                            <label for="amount">Aantal sessies</label>
                            <select class="p-1" name="amount" v-model="sessioncount" id="amount">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <hr class="mr-10 mt-4 mb-4">
                        <div class="flex flex-col justify-center space-y-4">
                            <!-- button -->
                            <p class="text-lg font-semibold">
                                Totaal prijs : &euro; {{ listing.listing.Price * sessioncount }}
                            </p>
                            <button
                                class="bg-black text-white py-3 px-2 rounded bg-emerald-500 hover:bg-emerald-500/75 font-semibold"
                                @click="listingstore.createBooking(id, listing.listing.Price)">
                                Training Boeken
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-2 flex  flex-col justify-start mb-12">
                <p class="font-semibold">
                    Recensie schrijven
                </p>
                <textarea v-model="WriteReview.Body" class="w-[50%] h-32 rounded-xl p-4 outline outline-1 focus:outline-2 "
                    placeholder="Schrijf hier je recensie"></textarea>
                <div class="flex flex-col space-y-4">
                    <label for="stars">Aantal sterren</label>
                    <select class="w-10" v-model="WriteReview.Rating" name="stars" id="stars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button v-on:click="SubmitReview()"
                        class="border-solid border-2 border-black text-black font-semibold  hover:bg-gray-200/75  py-2 px-2 rounded w-[150px]">
                        Recensie plaatsen
                    </button>
                </div>

                <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                    <div class="flex border-t border-gray-200 pt-10 items-start space-x-4 mb-8">
                        <div class="flex-shrink-0">
                            <img class="inline-block h-10 w-10 rounded-full" :src="authstore.user?.ProfilePicture"
                                alt="" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="border-b border-gray-200 focus-within:border-green-600">
                                <label for="comment" class="sr-only">Add your comment</label>
                                <textarea rows="3" name="comment" id="comment" v-model="WriteReview.Body"
                                    class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Add your comment..." />
                            </div>
                            <div class="flex justify-between pt-2">
                                <div class="flex items-center space-x-5">
                                    <div class="flow-root">
                                        <button type="button"
                                            class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                            <PaperClipIcon class="h-6 w-6" aria-hidden="true" />
                                            <span class="sr-only">Attach a file</span>
                                        </button>
                                    </div>
                                    <div class="flex">
                                        <StarIcon v-for="rating in [1, 2, 3, 4, 5]" :key="rating"
                                        :class="[hover >= rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0 cursor-pointer']"
                                        aria-hidden="true" @click="WriteReview.Rating = rating" @mouseout="hover = WriteReview.Rating" @mouseover="hover = rating" />
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <button @click="SubmitReview"
                                        class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-600">{{ review.Body }}</p>
                </div>

            </div>
        </div>
    </div>
</div></template>