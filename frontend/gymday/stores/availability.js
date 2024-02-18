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
            console.log(form.startdate, form.starttime, form.endtime)

            const availabilityService = useAvailabilityService()

            try {
                const result = await availabilityService.createTimeSlot(form.title, form.startdate, form.starttime, form.endtime)
                console.log(result)
                this.createTimeSlotModal = false
                await this.GetTimeSlotsByOwner(this.dateobject.startdate, this.dateobject.enddate)
            }
            catch (e) {
                console.log(e)
            }
        },

        async GetTimeSlotsByOwner(startdate, enddate) {
            const availabilityService = useAvailabilityService()
            try {
                const result = await availabilityService.getTimeSlotsByOwner(startdate, enddate)
                console.log(result)
                this.timeslots = result.timeslots
                console.log(this.timeslots)
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