<script setup>
import { baseURL } from '../../api';


const createlisting = ref({

    Title : '',
    Description : '',
    Price : 0,
    Location : '',
    City : '',
    Province : '',
    Country : '',
    Images : [{
        ImageURL : '',
        ImageNR : 1,
    },
    {
        ImageURL : '',
        ImageNR : 2,
    },
    {
        ImageURL : '',
        ImageNR : 3,
    },
    {
        ImageURL : '',
        ImageNR : 4,
    },
    {
        ImageURL : '',
        ImageNR : 5,
    }
],

})



async function CreateListing(){
    const { data } = await useFetch(`${baseURL}/user/listing`, {
        method: 'post',
        body: { 
            Title: createlisting.value.Title,
            Description: createlisting.value.Description,
            Price: createlisting.value.Price,
            Location: createlisting.value.Location,
            City: createlisting.value.City,
            Province: createlisting.value.Province,
            Country: createlisting.value.Country,
            Images: createlisting.value.Images,
        },
        credentials: 'include',
    })
    console.log(data.value)
}


</script>




<template>

    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[30%] mt-10">
            <!-- inputs -->
            <input v-model="createlisting.Title" type="text" placeholder="Titel" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <textarea v-model="createlisting.Description" type="text" placeholder="Omschrijving" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            </textarea>

            <input v-model="createlisting.Price" type="number" step="0.01" placeholder="Prijs" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Location" type="text" placeholder="Locatie" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.City" type="text" placeholder="Stad" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Province" type="text" placeholder="Provincie" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Country" type="text" placeholder="Land" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">

            <input v-model="createlisting.Images[0].ImageURL" type="text" placeholder="Grote foto 1 (url)" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Images[1].ImageURL" type="text" placeholder="foto 2 (url)" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Images[2].ImageURL" type="text" placeholder="foto 3 (url)" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Images[3].ImageURL" type="text" placeholder="foto 4 (url)" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
            <input v-model="createlisting.Images[4].ImageURL" type="text" placeholder="foto 5 (url)" class="border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">


            <button v-on:click="CreateListing(createlisting)" type="submit" class="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">Post </button>
        </div>
    </div>

</template>