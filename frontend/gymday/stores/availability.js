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
            // const {data, error} = await useFetch(`${baseURL}/user/timeslotsbyuserowner/${startdate}/${enddate}`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            // })
            // if (data) {
            //     this.timeslots = data.value.timeslots
            // } else if (error) {
            //     console.log(error)                
            // }
        }
    },
})

export default useAvailabilityStore