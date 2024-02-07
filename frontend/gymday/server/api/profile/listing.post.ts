import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
    const api = serverApi(event)
    const formDataBody = await readMultipartFormData(event);
    const formData = new FormData()

    let fileregex = new RegExp('file[0-9]+')

    formDataBody?.forEach((value) => {
        if (value.name && value.data) {
            // images is an array of files, so we need to append each one
            if ((value.name === 'file' || fileregex.test(value.name) )) { 
                const blob = new Blob([value.data], { type: value.type });
                formData.append(value.name, blob)
            } else {
                formData.append(value.name, value.data.toString())
            }
        }
    })

    try {
        // Do the actual request to the external API
        const res = await api.raw('/user/listing', 'POST', {
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