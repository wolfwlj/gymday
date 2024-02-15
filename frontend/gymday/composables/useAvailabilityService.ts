export const useAvailabilityService = () => {

    async function getTimeSlotsByOwner(startdate : string, enddate : string) :  Promise<any> {
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const timeslots = await $fetch(`/api/availability/gettimeslotsbyowner?start=${startdate}&end=${enddate}`, {
                headers: useRequestHeaders(['cookies']),
            })

            return timeslots
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function createTimeSlot(title : string, startdate : string, starttime : string, endtime : string){
        try {
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/availability/createtimeslot', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    title,
                    startdate,
                    starttime,
                    endtime
                },
                method: 'POST'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }

    return {
        getTimeSlotsByOwner,
        createTimeSlot,

    }

}
