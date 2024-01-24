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
        async createBooking(listingid, price) {
            console.log(listingid, price)
            const response = await useFetch(`${baseURL}/user/booking`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Title : "Test",
                    Price : price,
                    StartDate : "2021-01-01",
                    EndDate : "2021-02-01",
                    ListingID : listingid,
                },
                credentials: 'include',
                
            })
            const data = await response.json()
            return data
        }
    },
})







export default useListingStore