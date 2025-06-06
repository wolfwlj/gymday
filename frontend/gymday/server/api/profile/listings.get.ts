import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

import { defineEventHandler, createError } from 'h3'

// Remove the duplicate import statement
// import { serverApi } from '../utils/serverApi'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event)

    // startdate and enddate are passed as parameters to the event
    const query = getQuery(event)
    const userid = query?.userid

    try {
        // Do the actual request to the external API
        const listings = await api.get<any>(`/user/listingsbyuser/${userid}`)

        return listings
    } catch (err) {
        console.log(err)
        return createError('An error occurred while fetching the data.')
    }
})