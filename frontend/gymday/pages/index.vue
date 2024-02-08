<script setup>
import { baseURL } from '../api';

useSeoMeta({
    title: 'Homepagina',
    ogTitle: 'Homepagina - GymDay',
    description: 'Vind hier de perfecte personal trainer voor jouw!',
    ogDescription: 'Vind hier de perfecte personal trainer voor jouw!', 
})


</script>

<template>
    <div class="">
        <div class="">
            <Listings />
        </div>
    </div>
</template>