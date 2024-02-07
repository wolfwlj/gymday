import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

import { defineEventHandler, createError } from 'h3'

// Remove the duplicate import statement
// import { serverApi } from '../utils/serverApi'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event)

    // startdate and enddate are passed as parameters to the event
    const query = getQuery(event)
    const listingid = query?.listingid
    try {
        // Do the actual request to the external API
        const response = await api.delete<any>(`/user/listing/${listingid}`)

        return response
    } catch (err) {
        console.log(err)
        return createError('An error occurred while fetching the data.')
    }
})