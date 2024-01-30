<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { baseURL } from '../api'
import { storeToRefs } from 'pinia'
import useAuthStore from '../stores/auth'

const authstore = useAuthStore()


// const user = ref({
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl: authstore.user?.ProfilePicture,
// })

const navigation = [
  { name: 'Bodybuilding', to: '#', current: false },
  { name: 'Crossfit', to: '#', current: false },
  { name: 'Calisthenics', to: '#', current: false },
  { name: 'Yoga', to: '#', current: false },
  { name: 'Cardio', to: '#', current: true },
  { name: 'Fitness', to: '#', current: false },
  { name: 'Powerlifting', to: '#', current: false },
  { name: 'Powerbuilding', to: '#', current: false },
  { name: 'Strongman', to: '#', current: false },
  { name: 'Zwemmen', to: '#', current: false },
  { name: 'Vechtsporten', to: '#', current: false },
  { name: 'Andere', to: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', to: '#' },
  { name: 'Settings', to: '#' },
  { name: 'Sign out', to: '#' },
]

const router = useRouter()

const { logoutuser } = useAuthStore()

const logout = () => {
  logoutuser()
  router.push('/login')
}

</script>

<template>
  <Disclosure as="header" class="bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink :to="`/`">
              <button class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GymDay</button>
            </NuxtLink>
          </div>
        </div>
        <div class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
          <div class="w-full sm:max-w-xs">
            <Search />
          </div>
        </div>
        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open menu</span>
            <Bars3Icon v-show="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-show="open" class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <NuxtLink :to="`/verification`" v-show="authstore.user?.Tier < 99">
            <button class="font-semibold text-sm hover:bg-gray-50 py-2 px-2 rounded">Word een Gymday personal
              trainer!
            </button>
          </NuxtLink>

          <NuxtLink :to="`/listing/createlisting`" v-show="authstore.user?.Tier == 99">
            <button class="font-semibold text-sm hover:bg-gray-50 py-2 px-2 rounded">Post een Listing</button>
          </NuxtLink>

          <div class="flex space-x-3" v-show="!authstore.user">
            <UButton
              size="sm"
              class="text-black bg-transparent hover:bg-gray-50"
              variant="solid"
              label="Register"
              :trailing="false"
              :to="`/register`"
            />
  
            <UButton
              icon="i-heroicons-arrow-right-end-on-rectangle"
              size="sm"
              class="text-black bg-transparent hover:bg-gray-50"
              variant="solid"
              label="Login"
              :trailing="false"
              :to="`/login`"
            />
          </div>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 flex-shrink-0" v-show="authstore.user">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <img v-if="authstore.user" class="h-10 w-10 rounded-full" :src="authstore.user.ProfilePicture" alt="" />
                <span class="absolute -inset-1.5" />

                <span class="sr-only">Open user menu</span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <div class="w-full py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-left ps-5 cursor-pointer">
                    <NuxtLink :to="`/profile/${authstore.user?.ID}`">
                      Profiel
                    </NuxtLink>
                  </div>
                </MenuItem>
                <MenuItem>
                    <div class="w-full py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-left ps-5 cursor-pointer">
                      <NuxtLink :to="`/settings/${authstore.user?.ID}`">
                        Settings
                      </NuxtLink>
                    </div>
                </MenuItem>
                <MenuItem v-show="authstore.user?.Tier == 999">
                    <div class="w-full py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-left ps-5 cursor-pointer">
                      <NuxtLink :to="`/verification/dashboard`">
                        Dash
                      </NuxtLink>
                    </div>
                </MenuItem>
                <MenuItem>
                  <div class="w-full py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-left ps-5 cursor-pointer">
                    <NuxtLink v-on:click="logout()">
                      Uitloggen
                    </NuxtLink>
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <nav class="hidden overflow-x-auto scroll-smooth no-scrollbar lg:space-x-8 lg:flex lg:py-2" aria-label="Global">
        <a v-for="item in navigation" :key="item.name" :href="item.href"
          :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium cursor-pointer']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
      </nav>
    </div>

    <DisclosurePanel as="nav" class="lg:hidden" aria-label="Global">
      <div class="space-y-1 px-2 pb-3 pt-2 h-60 overflow-y-auto scroll-smooth no-scrollbar">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'block rounded-md py-2 px-3 text-base font-medium cursor-pointer']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>

      <div class="flex space-x-3 justify-end" v-show="!authstore.user">
        <UButton
          size="sm"
          class="text-black bg-transparent hover:bg-gray-50"
          variant="solid"
          label="Register"
          :trailing="false"
          :to="`/register`"
        />

        <UButton
          icon="i-heroicons-arrow-right-end-on-rectangle"
          size="sm"
          class="text-black bg-transparent hover:bg-gray-50"
          variant="solid"
          label="Login"
          :trailing="false"
          :to="`/login`"
        />
      </div>

      <div class="border-t border-gray-200 pb-3 pt-4" v-show="authstore.user">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img v-if="authstore.user" class="h-10 w-10 rounded-full" :src="authstore.user.ProfilePicture" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900">{{
              item.name }}</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
