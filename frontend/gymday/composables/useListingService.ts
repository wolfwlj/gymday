export const useListingService = () => {

    async function getListingReviews(listingid : string) :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const timeslots = await $fetch(`/api/listing/listingreviews?listingid=${listingid}`, {
                headers: useRequestHeaders(['cookies']),
            })

            return timeslots
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function createReview(listingid : string, rating : string, review : string){
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/listing/createreview', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    listingid,
                    rating,
                    review
                },
                method: 'POST'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }


    return {
        getListingReviews,
        createReview,

    }

}
