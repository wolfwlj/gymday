import { H3Event } from 'h3'
import Client from '../../../utils/client'

// server composable for calling the external API through Nitro Server
export const serverApi = (event: H3Event) => {
  const { apiUrl } = useRuntimeConfig().public

  const accessToken = getCookie(event, 'gymdaytoken')

  const client = new Client(apiUrl as string, {
    headers: {
      'Authorization': `${accessToken}`,
    } as HeadersInit
  })

  return client
}