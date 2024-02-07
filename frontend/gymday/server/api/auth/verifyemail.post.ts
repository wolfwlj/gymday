import { H3Event } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
  const api = serverApi(event)
  const { token } = await readBody(event)

  try {

    // Do the actual request to the external API
    const res = await api.raw('/user/verifyemail', 'POST', {
      body: {
        Token : token
      }
    })

    const cookies = (res?.headers.get('set-cookie') || '').split(',')

    for (const cookie of cookies) {
      appendHeader(event, 'set-cookie', cookie)
    }


    return { message: 'success', user: res._data.user }

  } catch (err) {
    throw createError('An error occurred while fetching the data.')
  }

})