<script setup>
import { baseURL } from '../../api';
import { StarIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/vue/24/outline"


const { id } = useRoute().params
const sessioncount = ref(1)

const { data : listing} = await useFetch(`${baseURL}/user/listing/${id}`, {
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
</script>

<template>
    <div class="flex justify-center mb-[20%]">
        <div class="w-[60%]">
            <div class="w-[100%] mt-2 mb-4">
                <p class="text-3xl font-semibold">{{ listing.listing.Title }}</p>
                <div class="flex items-center">
                    <StarIcon class="w-8 h-8"/>
                    <p class="text-lg">4.7/5 | 99999 recencies  </p>
                </div>
            </div>

            <div class="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-3">
                <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-4 lg:grid-rows-1 col-span-6">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-l-lg  ">
                        <img :src="listing.listing.Images[1].ImageURL" alt="listingpicigeuss" class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
                <div class="hidden lg:grid lg:grid-cols-1 col-span-3 lg:grid-rows-2 lg:gap-y-4">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden ">
                        <img :src="listing.listing.Images[1].ImageURL" alt="listingpicigeuss" class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden ">
                        <img :src="listing.listing.Images[2].ImageURL" alt="listingpicigeuss" class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
                <div class="hidden lg:grid lg:grid-cols-1 col-span-3 lg:grid-rows-2 lg:gap-y-4">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-tr-lg ">
                        <img :src="listing.listing.Images[1].ImageURL" alt="listingpicigeuss" class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-br-lg">
                        <img :src="listing.listing.Images[2].ImageURL" alt="listingpicigeuss" class="h-full w-full object-cover object-center aspect-block" />
                    </div>
                </div>
            </div>

            <div class="flex flex-row pt-8">
                <div class="mt-2 mb-4 w-[70%]">
                    <div class="w-[100%] ">
                        <div class="text-gray-500 w-[20%]">
                            <NuxtLink class="text-lg" :to="`../profile/${listing.listing.User.ID}`">
                                <a href="#" class="block hover:text-gray-400">{{ listing.listing.User.FirstName }} {{ listing.listing.User.LastName }}</a>
                            </NuxtLink>
                        </div>
                        <p class="text-2xl font-semibold">Personal Training</p>
                        <p class="text-lg ">Beschikbaarheid : maandag, dinsdag, woensdag</p>
                    </div>
                    <hr class="mr-10 mt-4 mb-4">
                    <div class="w-[100%] mt-2 mb-4 space-y-4">
                        <div class="flex space-x-2 items-center">
                            <PhoneIcon class="w-8 h-8"/>
                            <p class="text-lg">{{ listing.listing.User.PhoneNumber }}</p>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <EnvelopeIcon class="w-8 h-8"/>
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
                                Totaal prijs : &euro;  {{ listing.listing.Price * sessioncount }}
                            </p>
                            <button class="bg-black text-white py-3 px-2 rounded bg-emerald-500 hover:bg-emerald-500/75 font-semibold">
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
                <textarea v-model="WriteReview.Body" class="w-[50%] h-32 rounded-xl p-4 outline outline-1 focus:outline-2 " placeholder="Schrijf hier je recensie"></textarea>
                <div class="flex flex-col space-y-4">
                    <label for="stars">Aantal sterren</label>
                    <select class="w-10" v-model="WriteReview.Rating"  name="stars" id="stars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button v-on:click="SubmitReview()" class="border-solid border-2 border-black text-black font-semibold  hover:bg-gray-200/75  py-2 px-2 rounded w-[150px]">
                        Recensie plaatsen
                    </button>
                </div>
            </div>
            <div class="space-y-8 w-[50%]">
                <p class="text-2xl font-semibold">
                    Recente Recencies : 
                </p>
                <div v-for="review  in listing.listing.Reviews.slice().reverse()" :key="listing.ID" class=" ">
                    <div class="bg-white p-4 rounded-lg shadow-md space-y-1">
                        <NuxtLink class="text-lg" :to="`../profile/${review.User.ID}`">
                            <p class="text-gray-800 text-lg mr-2">{{ review.User.FirstName }} {{ review.User.LastName }}</p>
                        </NuxtLink>
                        <div class="flex">
                            <StarIcon class="w-5 h-5"  />
                            <StarIcon class="w-5 h-5"  v-show=" review.Rating >= 2 "/>
                            <StarIcon class="w-5 h-5"  v-show=" review.Rating >= 3  "/>
                            <StarIcon class="w-5 h-5"  v-show=" review.Rating >= 4  "/>
                            <StarIcon class="w-5 h-5"  v-show="review.Rating ==  5 "/>
                        </div>
                        <p class="text-gray-600">{{ review.Body }}</p>
                    </div>

                </div>  
            </div>
        </div>
    </div>
</template>