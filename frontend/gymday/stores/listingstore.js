import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useListingStore = defineStore({
    id: 'listingstore',
    state: () => ({
        listing : null,
        listings : null,
    }),
    getters: {

    },
    actions: {

    },
})







export default useListingStore