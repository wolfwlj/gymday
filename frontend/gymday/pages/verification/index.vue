<script setup>
// import { baseURL } from '../../api';
import useAdminStore from '~/stores/admin';

const adminStore = useAdminStore();

const Reason = ref('')

async function SubmitVerification(){
    let check = await adminStore.submitApplication(Reason.value) 
    if(check == 'success'){
        alert('Verificatie aanvraag verzonden')
    }
}

// async function CreateListing(){
//     const { data } = await useFetch(`${baseURL}/user/listing`, {
//         method: 'post',
//         body: { 
//             Title: createlisting.value.Title,
//             Description: createlisting.value.Description,
//             Price: createlisting.value.Price,
//             Location: createlisting.value.Location,
//             City: createlisting.value.City,
//             Province: createlisting.value.Province,
//             Country: createlisting.value.Country,
//             Images: createlisting.value.Images,
//         },
//         credentials: 'include',
//     })
// }



</script>

<template>

    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[30%] mt-10">
            <h1 class="text-3xl font-bold mb-5">
                Verificatie
            </h1>
            <p class="text-md">
                Voordat jouw listings openbaar kunnen worden gezet, moet je eerst een verificatie aanvragen.
                Wij willen wat meer over je weten, zodat we zeker weten dat je op de website past.
            </p>
        
            <p class="mt-2">
                
            </p>
            
            <UForm  class="space-y-4" >
                <UFormGroup  label="Vertel over je zelf, ervaring, doelgroep etc.." name="Reason">
                    <UTextarea  v-model="Reason"/>
                </UFormGroup>
                <UButton @click="SubmitVerification" type="submit">
                    Aanvraag verzenden
                </UButton>
            </UForm>
        </div>
    </div>

</template>