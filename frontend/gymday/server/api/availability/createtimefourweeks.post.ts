import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
    const api = serverApi(event)
    const { Title, Dates, StartTime, EndTime } = await readBody(event)
    console.log(Title, Dates, StartTime, EndTime)
    try {

        // Do the actual request to the external API
        const res = await api.raw('/user/timeslotfourweeks', 'POST', {
        body: {
            Title : Title,
            Dates : Dates,
            StartTime : StartTime,
            EndTime : EndTime
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