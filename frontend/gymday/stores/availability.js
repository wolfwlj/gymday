import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
const useAvailabilityStore = defineStore({
    id: 'availabilitystore',
    state: () => ({

        createTimeSlotModal : false,

        timeslots : [],

        dateobject: {
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
        async CreateTimeSlot(form) {


            const startdate = new Date(form.startdate)
            const starttime = form.starttime.split(':')
            startdate.setHours(starttime[0])
            startdate.setMinutes(starttime[1])
            const enddate = new Date(form.startdate)
            const endtime = form.endtime.split(':')
            enddate.setHours(endtime[0])
            enddate.setMinutes(endtime[1])

            const {data, error} = await useFetch(`${baseURL}/user/timeslot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    Title : form.title,
                    StartDate : startdate,
                    EndDate : enddate,
                },
                credentials: 'include',
            })
            if (data) {
                await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
                this.createTimeSlotModal = false
            }
        },

        async GetTimeSlotsByOwner(startdate, enddate) {
            const {data, error} = await useFetch(`${baseURL}/user/timeslotsbyuserowner/${startdate}/${enddate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (data) {
                this.timeslots = data.value.timeslots
            } else if (error) {
                console.log(error)                
            }
        }
    },
})

export default useAvailabilityStore