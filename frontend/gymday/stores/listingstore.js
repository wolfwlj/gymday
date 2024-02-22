import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
import Swal from 'sweetalert2'


const useListingStore = defineStore({
    id: 'listingstore',
    state: () => ({
        listing : null,
        listings : null,
        reviews : null,
        imageModal : false,
        selectedimg : null,

        openDatePicker : false,
        selectedTimeSlot : {
            ID: 0,
            Title: '',
            StartDate: '',
            EndDate: ''
        },
        selectedListing : null,
        selectedOwner : null,
        retrievedTimeslots : null,
        dateobject: {
            selectedDate : "",
            realCurrentDate : "",
            rawdate : "",
            startdate : "",
            enddate : "",
            weeknumber : "",
            dayNumber : "",
            currentWeekNumber : "",
            year : "",
            monthname : "",
            weekdates : [],
        },
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
                await Swal.fire({
                    title: 'Recensie geplaatst!',
                    icon: 'success',
                    timerProgressBar: true,
                    timer: 1500,
                }) 
                return true
            }
            catch (e) {
                console.log(e)
                Swal.fire({
                    title: 'Er is iets fout gegaan',
                    text: 'Mogelijk probeert u meer dan 1 recensie te plaatsen. ',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        },

        async gettimeslotsbyday(ownerid) {
            try {
                const result = await $fetch(`/api/availability/gettimeslotsbyday?ownerid=${ownerid}&date=${this.dateobject.selectedDate}`)
                this.retrievedTimeslots = result.timeslots
            } catch (e) {
                console.log(e)
            }

        }
    },

})







export default useListingStore