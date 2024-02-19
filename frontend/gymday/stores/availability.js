import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
const useAvailabilityStore = defineStore({
    id: 'availabilitystore',
    state: () => ({

        createTimeSlotModal : false,
        timeslots : [],

        selectedTimeSlot : null,
        editTimeSlotModal : false,

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

            const availabilityService = useAvailabilityService()
            try {
                const result = await availabilityService.createTimeSlot(form.title, form.startdate, form.starttime, form.endtime)
                this.createTimeSlotModal = false
                await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
            }
            catch (e) {
                console.log(e)
            }
        },

        async CreateTimeSlotFourWeeks(form) {
            // if date is 2024-02-18, get the dates of the next 3 weeks
            let dates = []
            let date = new Date(form.startdate)
            dates.push(date.toISOString().split('T')[0])
            for (let i = 1; i < 4; i++) {
                let newdate = new Date(date)
                console.log(newdate)
                newdate.setDate(date.getDate() + 7 * i)
                console.log(dates)
                // change date to string, from 2024-02-19T00:00:00.000Z to just 2024-02-19
                dates.push(newdate.toISOString().split('T')[0])
            }
            console.log(dates)

            try {
                const result = await $fetch(`/api/availability/createtimefourweeks`, { 
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        Title : form.title,
                        Dates : dates,
                        StartTime : form.starttime,
                        EndTime : form.endtime,
                    },
                    credentials: 'include',
                })
            }
            catch (e) {
                console.log(e)
            }

            await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
            this.createTimeSlotModal = false
        },

        async GetTimeSlotsByOwner(startdate, enddate) {
            const availabilityService = useAvailabilityService()
            try {
                const result = await availabilityService.getTimeSlotsByOwner(startdate, enddate)
                this.timeslots = result.timeslots
            }
            catch (e) {
                console.log(e)
            }
        },
        
        async UpdateTimeSlot(form) {
            try{
                const response = await $fetch(`/api/availability/updatetimeslot`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        Title : form.title,
                        StartDate : form.startdate,
                        StartTime : form.starttime,
                        EndTime : form.endtime,
                        TimeslotID : this.selectedTimeSlot.ID,
                    },
                    credentials: 'include',
                })
                await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
                this.editTimeSlotModal = false
            }
            catch (e) {
                console.log(e)
            }
        },
        async DeleteTimeSlot() {
            try {
                const response = await $fetch(`/api/availability/deletetimeslot?timeslotid=${this.selectedTimeSlot.ID}`, {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                console.log(response)
                await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
                this.editTimeSlotModal = false
            }
            catch (e) {
                console.log(e)
            }
        }
    },
})

export default useAvailabilityStore