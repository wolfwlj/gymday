<script setup>
import { ref } from 'vue'
import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    PhotoIcon,
    CalendarDaysIcon,
    ArchiveBoxIcon,
    QueueListIcon,
    CurrencyEuroIcon,
} from '@heroicons/vue/24/outline'
import useAuthStore from '../../stores/auth'; // import the auth store we just created
import useProfileStore from '../../stores/profile'
import editprofile from '~/components/profile/modals/editprofile.vue';
import listingsprofile from '~/components/profile/listingsprofile.vue';
import Galleryprofile from '~/components/profile/galleryprofile.vue';
import Bookings from '~/components/booking/bookings.vue';
import Calendar from '~/components/availability/Calendar.vue';


const navigation = [
    { name: 'General', icon: UserCircleIcon },
    { name: 'Listings', icon: QueueListIcon },
    { name: 'Bookings', icon: ArchiveBoxIcon },
    { name: 'Betalingen', icon: CurrencyEuroIcon },
    { name: 'Mijn Beschikbaarheid', icon: CalendarDaysIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Plan', icon: CubeIcon },
    { name: 'Billing', icon: CreditCardIcon },
]

const profileStore = useProfileStore()
const route = useRoute()
const authstore = useAuthStore()
const param = route.params.id
const isUser = authstore.user?.ID === parseInt(param)
const currentProfileTab = ref('General')

await profileStore.getUser(param)
</script>

<template>
    <div class="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <aside
            class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
            <nav class="flex-none px-4 sm:px-6 lg:px-0">
                <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                    <li v-for="item in navigation" :key="item.name">
                        <span @click="currentProfileTab = item.name"
                            :class="[item.name === currentProfileTab ? 'bg-gray-50 text-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50', 'cursor-pointer group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold']">
                            <component :is="item.icon"
                                :class="[item.name === currentProfileTab ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600', 'cursor-pointer h-6 w-6 shrink-0']"
                                aria-hidden="true" />
                            {{ item.name }}
                        </span>
                    </li>
                </ul>
            </nav>
        </aside>

        <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
            <div v-show="currentProfileTab === 'General'"
                class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <div class="flex justify-between">
                        <div>
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so
                                be
                                careful what you share.</p>
                        </div>
                        <UButton v-if="isUser" @click="profileStore.isEditProfileOpen = true">Profiel bewerken</UButton>
                    </div>

                    <editprofile v-if="profileStore.isEditProfileOpen" />

                    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Avatar</dt>
                            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto shrink-0">
                                <img class="h-16 w-16 object-cover rounded-full" :src="profileStore.user?.ProfilePicture"
                                    alt="Current profile photo" />
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First Name</dt>
                            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div class="text-gray-900">{{ profileStore.user?.FirstName }}</div>
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last name</dt>
                            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div class="text-gray-900">{{ profileStore.user?.LastName }}</div>
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Bio</dt>
                            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div class="text-gray-900 max-w-[40vh]">
                                    <p class="text-wrap overflow-hidden break-words truncate">
                                        {{ profileStore.user?.Bio }}
                                    </p>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div v-show="currentProfileTab === 'Listings'" class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                listings
            </div>
            <div v-if="currentProfileTab === 'Bookings'" class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <Bookings />
            </div>
            <div v-show="currentProfileTab === 'Betalingen'" class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                Betaling beheer
            </div>
            <div v-if="currentProfileTab === 'Mijn Beschikbaarheid'" class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <Calendar />
            </div>
        </main>
    </div>
</template> 