export const useBookingService = () => {

    async function getBookings() :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const timeslots = await $fetch(`/api/booking/getbookings`, {
                headers: useRequestHeaders(['cookies']),
            })

            return timeslots
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function createBooking(startdate : string, listingid : string){
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/booking/createbooking', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    startdate,
                    listingid
                },
                method: 'POST'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function createManualBooking(firstname : string, lastname : string, email : string, phone : string, startdate : string, enddate : string, listingid : string){
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/booking/createmanualbooking', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    firstname,
                    lastname,
                    email,
                    phone,
                    startdate,
                    enddate,
                    listingid
                },
                method: 'POST'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function updateBooking(bookingid : string, status : string){
        try {
            const response = await $fetch('/api/booking/updatebooking', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    bookingid,
                    status,
                },
                method: 'PUT'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }

    return {
        getBookings,
        createBooking,
        createManualBooking,
        updateBooking
    }

}
