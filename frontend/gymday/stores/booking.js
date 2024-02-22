import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
import Swal from 'sweetalert2'

const useBookingStore = defineStore({
    id: 'bookingstore',
    state: () => ({
        bookings : [],
        myorders : [],
        
        addbookingModal : false,
        bookingModal : false,
        
        selectedBooking : null,

    }),
    getters: {

    },
    actions: {
        async manualCreateBooking(form) {

            const startdate = new Date(form.startdate)
            const starttime = form.starttime.split(':')
            startdate.setHours(starttime[0])
            startdate.setMinutes(starttime[1])
            const enddate = new Date(form.startdate)
            const endtime = form.endtime.split(':')
            enddate.setHours(endtime[0])
            enddate.setMinutes(endtime[1])

            const bookingService = useBookingService()
            console.log(form)
            try {
                const result = await bookingService.createManualBooking(form.firstname, form.lastname, form.email, form.phone, startdate, enddate, form.listingID)
                console.log(result)
                this.addbookingModal = false
                await this.getBookings()
                await Swal.fire({
                    title: 'Booking verzonden!',
                    icon: 'success',
                    timerProgressBar: true,
                    timer: 1000,
                })             
            }
            catch (e) {
                console.log(e)
            }

        },

        async getMyOrders() {
            try {
                const result = await $fetch(`/api/booking/getmyorders`, {
                    method: 'GET',
                })
                this.myorders = result.bookings
            } catch (e) {
                console.log(e)
            }

        },


        async createBooking(listingid, startdate, starttime, timeslotID) {
            // create timestamp
            const date = new Date(startdate)
            const time = starttime.split(':')
            date.setHours(time[0])
            date.setMinutes(time[1])

            const bookingService = useBookingService()

            try {
                const result = await bookingService.createBooking(listingid, date, timeslotID)
                this.addbookingModal = false
                await this.getBookings()

                await Swal.fire({
                    title: 'Booking verzonden!',
                    icon: 'success',
                    timerProgressBar: true,
                    timer: 1000,
                }) 
                return true
            }
            catch (e) {
                Swal.fire({
                    title: 'Er is iets fout gegaan',
                    text: 'Mogelijk is het tijdslot al bezet, excuus voor het ongemak. ',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return false
            }

        },
        async getBookings() {

            const bookingService = useBookingService()
            try {
                const result = await bookingService.getBookings()

                this.bookings = result.bookings
                console.log(this.bookings)
            }
            catch (e) {
                console.log(e)
            }
        },
        
        async UpdateBooking(status) {
            const bookingService = useBookingService()
            try {
                const result = await bookingService.updateBooking(this.selectedBooking.ID, status)
                console.log(result)
                await this.getBookings()
                this.bookingModal = false
                
            }
            catch (e) {
                console.log(e)
            }

        }
    },
})

export default useBookingStore