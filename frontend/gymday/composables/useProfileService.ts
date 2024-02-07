import type { Form } from "@nuxt/ui/dist/runtime/types"

export const useProfileService = () => {

    async function getUser(userid : string) :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const user = await $fetch(`/api/profile/user?userid=${userid}`, {
                headers: useRequestHeaders(['cookies']),
            })

            return user
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function getListings(userid : string) :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const listings = await $fetch(`/api/profile/listings?userid=${userid}`, {
                headers: useRequestHeaders(['cookies']),
            })

            return listings
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function deleteListing(listingid : string) :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch(`/api/profile/deletelisting?listingid=${listingid}`, {
                headers: useRequestHeaders(['cookies']),
                method: 'DELETE'
            })

            return response
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
    // create interface for bodydata
    async function updateProfile(FirstName : string, LastName : string, Bio : string, pfp : File){
        
        let form = new FormData()
        form.append('FirstName', FirstName)
        form.append('LastName', LastName)
        form.append('Bio', Bio)
        form.append('name', 'file')
        form.append('file', pfp)
        
        try {
            const response = await $fetch(`/api/profile/profile`, {
                headers: useRequestHeaders(['cookies']),
                body: form,
                method: 'PUT'
            })

            return response
        } catch(err) {
            return Promise.reject(err)
        }
    }

    // const result = await profileService.addListing(title, city, tags, description, price, location, images, privatelisting)

    async function addListing(title : string, city : string, tags : string, description : string, price : string, location : string, images : File[], imageamount : number,privatelisting : boolean){
        let form = new FormData()
        form.append('Title', title)
        form.append('City', city)
        form.append('Tags', tags)
        form.append('Description', description)
        form.append('Price', price)
        form.append('Location', location)
        form.append('PrivateListing', privatelisting.toString())
        form.append('ImageAmount', imageamount.toString())
        for (let i = 0; i < images.length; i++) {
            form.append(`name${i+1}`, `file${i+1}`);
            form.append(`file${i+1}`,  images[i]); 
        }

        try {
            const response = await $fetch(`/api/profile/listing`, {
                headers: useRequestHeaders(['cookies']),
                body: form,
                method: 'POST'
            })

            return response
        } catch(err) {
            return Promise.reject(err)
        }
    }
    return {
        getUser,
        getListings,
        deleteListing,
        createReview,
        updateProfile,
        addListing
    }

}
