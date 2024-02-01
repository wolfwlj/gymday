import {defineStore} from 'pinia'
import { baseURL } from '../api.js'

const useBookingStore = defineStore({
    id: 'bookingstore',
    state: () => ({
        bookings : [],
        bookingModal : false,
        selectedBooking : null,
    }),
    getters: {

    },
    actions: {
        async createBooking(listingid, startdate, starttime) {

            // create timestamp
            const date = new Date(startdate)
            const time = starttime.split(':')
            console.log(time)
            date.setHours(time[0])
            date.setMinutes(time[1])
            console.log(date)

            const {data, error} = await useFetch(`${baseURL}/user/booking`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    StartDate : date,
                    ListingID : listingid,
                },
                credentials: 'include',
                
            })
            if (data.success) {
                alert('Booking verzonden!')
            }
        },
        async getBookings() {
            const { data, error } = await useFetch(`${baseURL}/user/bookings`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            console.log(data)
            this.bookings = data.value.bookings
            console.log(this.bookings)
        }
    },
})

export default useBookingStore