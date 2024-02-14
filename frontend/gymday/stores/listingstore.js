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

            const listingService = useListingService()
            try {
                const result = await listingService.getListingReviews(listingid)
                this.reviews = result.reviews
            }
            catch (e) {
                console.log(e)
            }
        },

        async submitReview(listingid, rating, review) {

            const listingService = useListingService()

            try {
                const result = await listingService.createReview(listingid, rating, review)

                console.log(result)
                await this.getListingReviews(listingid)
            }
            catch (e) {
                console.log(e)
            }
        },
    },

})







export default useListingStore