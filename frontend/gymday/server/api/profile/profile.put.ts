import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
    const api = serverApi(event)


    const formDataBody = await readMultipartFormData(event);
    const formData = new FormData()

    // Append the data to a new FormData (need to convert Buffer into string / Blob)
    formDataBody?.forEach((value) => {
        if (value.name && value.data) {
            if ((value.name === 'file')) {
                const blob = new Blob([value.data], { type: value.type });
                formData.append(value.name, blob)
            } else {
                formData.append(value.name, value.data.toString())
            }
        }
    })

    try {   
        // Do the actual request to the external API
        const res = await api.raw(`/user/user`, 'PUT', {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
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


