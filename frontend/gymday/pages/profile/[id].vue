<script setup>
import useAuthStore  from '../../stores/auth'; // import the auth store we just created
import useProfileStore from '../../stores/profile'
import { UserIcon } from '@heroicons/vue/20/solid'
import publiclistingsprofile from '~/components/listing/publiclistingsprofile.vue';

const profileStore = useProfileStore()
const route = useRoute()
const param = route.params.id
const currentProfileTab = ref(1)

await profileStore.getUser(param)
</script>


<template> 
    <main class="flex flex-col w-full sm:h-[90vh] pt-4">
        <div class="flex justify-center ">
            <div class="flex sm:space-x-8  px-4 sm:px-0 sm:w-[70%] sm:max-h-[20vh]  sm:flex-row flex-col">
                <div class="sm:w-[20%] flex my-auto justify-center ">
                    <img v-if="profileStore.user?.ProfilePicture && profileStore.user?.ProfilePicture !== ''" class="h-48 w-48 rounded-lg" :src="profileStore.user?.ProfilePicture" alt="" />
                    <div v-else class="mx-auto w-fit">
                        <UserIcon class="inline-block h-48 w-48 rounded-full text-gray-500/50" />
                    </div>
                </div>
                <div class="sm:w-[80%] sm:max-w-[80%]">
                    <div class="flex space-x-2 mb-2">
                        <h2 class="text-2xl font-semibold cursor-pointer">{{profileStore.user?.FirstName}} {{profileStore.user?.LastName}}</h2>
                    </div>
                    <div class="overflow-auto max-h-[85%]">
                        <p class="text-wrap overflow-hidden break-words truncate">{{ profileStore.user?.Bio }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center  sm:min-h-[70%] mt-4 ">
            <div class="flex w-[70%] border-solid border-t sm:flex-row flex-col">
                <div class="text-gray-500 p-4 sm:w-[20%] m-h-full border-solid sm:border-r border-b">
                    <ul class="flex sm:flex-col sm:flex-none space-x-4 sm:space-x-0 justify-center sm:justify-normal  sm:space-y-2 text-lg">
                        <li><a @click="currentProfileTab = 1" :class="currentProfileTab == 1 ? 'underline'  : null" class="block hover:text-gray-400 hover:underline underline-offset-4 cursor-pointer">Listings</a></li>
                        <li><a @click="currentProfileTab = 2" :class="currentProfileTab == 2 ? 'underline'  : null" class="block hover:text-gray-400 hover:underline underline-offset-4 cursor-pointer">Recensies</a></li>
                    </ul>
                </div>
                <div class="sm:p-4 sm:w-[80%]">
                    <div v-if="currentProfileTab == 1" >
                        <publiclistingsprofile />
                    </div>
                    <div v-if="currentProfileTab == 2" >
                        Deze tab komt nog, work in progress
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>