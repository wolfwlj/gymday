<script setup>
import useAdminStore from  '~/stores/admin';
import ApplicationModal from '~/components/verification/applicationModal.vue';
import { storeToRefs } from "pinia";
const adminStore = useAdminStore();
await adminStore.getApplications()
</script>

<template>
    <ApplicationModal v-if="adminStore.applicationModal"/>

    <div class="flex justify-center align-middle item-center">
        <div class="flex flex-col w-[60%] mt-10">
            <h1 class="text-3xl font-bold mb-5">
                Beheer de PT verificatie aanvragen

                <button @click="adminStore.getApplications">Haal data op</button>
            </h1>
            <p class="text-md">
            </p>
            <p class="mt-2">
            </p>

            <div class="px-4 sm:px-6 lg:px-8">
                <div class="mt-8 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tel</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                Actie
                                <span class="sr-only">Open</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="application in adminStore.applications" :key="application.id">
                                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-11 w-11 flex-shrink-0">
                                            <img class="h-11 w-11 rounded-full" :src="application.User.ProfilePicture" alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900">{{ application.User.FirstName }}</div>
                                            <div class="mt-1 text-gray-500">{{ application.User.LastName }}</div>
                                        </div>
                                    </div>
                                </td>

                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{application.Status}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{application.User.PhoneNumber}}</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{application.User.Email}}</span>
                                </td>
                                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="adminStore.applicationModal = true, adminStore.selectedApplication = application">Open
                                        <span class="sr-only">, 
                                        {{ application.ID }}
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>