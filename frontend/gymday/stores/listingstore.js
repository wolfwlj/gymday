import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useListingStore = defineStore({
    id: 'listingstore',
    state: () => ({
        listing : null,
        listings : null,
        reviews : null,
        imageModal : false,
        selectedimg : null,
    }),
    getters: {

    },
    actions: {

        async getListingReviews(listingid) {
            console.log("dasdsad")
            const {data, error } = await useFetch(`${baseURL}/user/reviews/${listingid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if (data.value) {
                this.reviews = data.value.reviews
            }
            return data.value.reviews
        },

        async submitReview(listingid, rating, review) {
            console.log(listingid, rating, review)
            const {data, error} = await useFetch(`${baseURL}/user/review`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Body : review,
                    Rating : rating,
                    ListingID : listingid,

                },
                credentials: 'include',
            })
            if (data.value) {
                await this.getListingReviews(listingid)
            } else {
                console.log(error)
            }
        },
    },

})







export default useListingStore