import { H3Event } from 'h3'
import Client from '../utils/client'
import { baseURL } from '../api'
// server composable for calling the external API through Nitro Server
export const useApi = () => {

  const accessToken = useCookie('gymdaytoken')
  console.log(accessToken.value)
  const refreshToken = useCookie('Refresh-Token')

  const client = new Client(baseURL as string, {
    headers: {
      'Authorization': `${accessToken.value}`,
      'Refresh-Token': `Bearer ${refreshToken.value}`,
    } as HeadersInit
  })

  return client
}