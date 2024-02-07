import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

import { defineEventHandler, createError } from 'h3'

// Remove the duplicate import statement
// import { serverApi } from '../utils/serverApi'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event)

    // startdate and enddate are passed as parameters to the event

    try {
        // Do the actual request to the external API
        const bookings = await api.get<any>(`/user/bookings`)

        return bookings
    } catch (err) {
        console.log(err)
        return createError('An error occurred while fetching the data.')
    }
})