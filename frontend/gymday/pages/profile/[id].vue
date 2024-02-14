<script setup>
import useAuthStore  from '../../stores/auth'; // import the auth store we just created
import useProfileStore from '../../stores/profile'
import { UserIcon } from '@heroicons/vue/20/solid'
import editprofile from '~/components/profile/modals/editprofile.vue';
import publiclistingsprofile from '~/components/listing/publiclistingsprofile.vue';
import Galleryprofile from '~/components/profile/galleryprofile.vue';

const profileStore = useProfileStore()
const route = useRoute()
const authstore = useAuthStore()
const param = route.params.id
const isUser = authstore.user?.ID === parseInt(param)
const currentProfileTab = ref(1)

await profileStore.getUser(param)
</script>

<template> 
    <main class="flex flex-col w-full h-[90vh] pt-4">
        <div class="flex justify-center">
            <div class="flex space-x-8 w-[70%] max-h-[20vh]  ">
                <div class="w-[20%] flex my-auto justify-center">
                    <img v-if="profileStore.user?.ProfilePicture && profileStore.user?.ProfilePicture !== ''" class="h-48 w-48 rounded-lg" :src="profileStore.user?.ProfilePicture" alt="" />
                    <div v-else class="mx-auto w-fit">
                        <UserIcon class="inline-block h-48 w-48 rounded-full text-gray-500/50" />
                    </div>
                </div>
                <div class="w-[80%] max-w-[80%]">
                    <div class="flex space-x-2 mb-2">
                        <h2 class="text-2xl font-semibold cursor-pointer">{{profileStore.user?.FirstName}} {{profileStore.user?.LastName}}</h2>

                        <editprofile v-if="profileStore.isEditProfileOpen" />
                    </div>
                    <div class="overflow-auto max-h-[85%]">
                        <p class="text-wrap overflow-hidden break-words truncate">{{ profileStore.user?.Bio }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center min-h-[70%] mt-4 ">
            <div class="flex w-[70%] border-solid border-t flex-col">
                <div class="text-gray-500 p-2 w-[100%] m-h-full flex justify-center">
                    <ul class=" text-lg flex space-x-4  justify-between">
                        <li><a @click="currentProfileTab = 1" :class="currentProfileTab == 1 ? 'underline'  : null" class="block hover:text-gray-400 hover:underline underline-offset-[6px] cursor-pointer">Advertensies</a></li>
                        <li><a @click="currentProfileTab = 2" :class="currentProfileTab == 2 ? 'underline'  : null" class="block hover:text-gray-400 hover:underline underline-offset-[6px] cursor-pointer">Recensies</a></li>
                    </ul>
                </div>
                <div class="p-4 w-[80%]">
                    <div v-if="currentProfileTab == 1" >
                        <publiclistingsprofile />
                    </div>
                    <div v-if="currentProfileTab == 2" >
                        Recensies
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
