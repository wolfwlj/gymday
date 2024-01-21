<script setup>
import { baseURL } from '../../api';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import  useAuthStore  from '../../stores/auth'; // import the auth store we just created
import { onMounted } from 'vue'
import useProfileStore from '../../stores/profile'
import editprofile from '~/components/profile/editprofile.vue';
const profileStore = useProfileStore()
const route = useRoute()
const authstore = useAuthStore()
const userinfo = useState('profile')
const param = route.params.id
const isUser = authstore.user?.ID === parseInt(param)

const { data : user} = await useFetch(`${baseURL}/user/user/${param}`, {
    method: 'get',
    credentials: 'include',
})

profileStore.user = user.value.user
userinfo.value = profileStore.user

console.log(userinfo.value)

</script>

<template> 
    <main class="flex flex-col w-full h-[90vh] pt-4">
        <div class="flex justify-center">
            <div class="flex space-x-8 w-[70%] max-h-[20vh]  ">
                <div class="w-[20%]">
                    <div v-if="userinfo?.ProfilePicture != undefined" class=" aspect-square	w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[100%] rounded-xl ">
                        <img :src="userinfo?.ProfilePicture" alt="Profiel foto" class="h-full w-full object-cover object-center lg:h-full lg:w-full " />
                    </div>
                    <div v-else class=" aspect-square	w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[100%] rounded-xl ">
                        {{ userinfo?.ProfilePicture  }}
                        <img  src="" alt="">
                    </div>
                </div>
                <div class="w-[80%] max-w-[80%]">
                    <div class="flex space-x-2">
                        <h2 class="text-2xl font-semibold">{{userinfo?.FirstName}} {{userinfo?.LastName}}</h2>
                        <UButton v-if="isUser" @click="profileStore.isEditProfileOpen = true">Profiel bewerken</UButton>
                        <editprofile v-if="profileStore.isEditProfileOpen" />
                    </div>
                    <p >{{ userinfo?.Bio}}</p>
                    <p class="text-wrap">asdasdasasdasdasasdasdasasdasdasasdas</p>
                </div>
            </div>
        </div>

        <div class="flex justify-center min-h-[70%] mt-4 ">
            <div class="flex w-[70%] border-solid border-t">
                <div class="text-gray-500 p-4 w-[20%] m-h-full border-solid border-r">
                    <ul class="space-y-2 text-lg">
                        <li><a href="#" class="block hover:text-gray-400">Listings</a></li>
                        <li><a href="#" class="block hover:text-gray-400">Producten</a></li>
                        <li><a href="#" class="block hover:text-gray-400">Foto Galerij</a></li>
                    </ul>
                </div>
                <div class="p-4 w-[80%]">
                    <div class="">
                        {{ userinfo?.Username}}               
                        {{ userinfo?.ProfilePicture }} 
                        <p>asdasdas</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>