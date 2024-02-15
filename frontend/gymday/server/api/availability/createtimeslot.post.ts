import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
    const api = serverApi(event)
    const { title, startdate, starttime, endtime } = await readBody(event)

    try {

        // Do the actual request to the external API
        const res = await api.raw('/user/timeslot', 'POST', {
        body: {
            Title : title,
            StartDate : startdate,
            StartTime : starttime,
            EndTime : endtime
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