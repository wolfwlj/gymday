import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
    const api = serverApi(event)
    const { startdate, listingid, timeslotID} = await readBody(event)
    console.log(timeslotID)
    try {

        // Do the actual request to the external API
        const res = await api.raw('/user/booking', 'POST', {
        body: {
            StartDate : startdate,
            ListingID : listingid,
            TimeslotID : timeslotID
        }
        })

        const cookies = (res?.headers.get('set-cookie') || '').split(',')

        for (const cookie of cookies) {
        appendHeader(event, 'set-cookie', cookie)
        }

        return res._data
    } catch (err) {
        throw createError('An error occurred while fetching the data.')
    }

})