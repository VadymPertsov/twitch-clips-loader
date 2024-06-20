import {
  LOCAL_STORAGE_EXPIRATION_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '@/constants/localstorage'
import axios, { AxiosResponse } from 'axios'

interface TwitchTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export const Axios = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
})

Axios.interceptors.request.use(
  async config => {
    const { token, expiration } = getTokenFromLocalStorage()

    if (!token || !expiration || Date.now() >= expiration) {
      await fetchNewToken()
    }

    const updatedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    if (updatedToken) {
      config.headers['Authorization'] = `Bearer ${updatedToken}`
      config.headers['Client-ID'] = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const fetchNewToken = async (): Promise<void> => {
  try {
    const { data }: AxiosResponse<TwitchTokenResponse> = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      }
    )

    saveTokenToLocalStorage(data.access_token, data.expires_in)
  } catch (error) {
    console.error('Error fetching access token:', error)
    throw error
  }
}

const saveTokenToLocalStorage = (token: string, expiresIn: number): void => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
  localStorage.setItem(
    LOCAL_STORAGE_EXPIRATION_KEY,
    (Date.now() + expiresIn * 1000).toString()
  )
}

const getTokenFromLocalStorage = (): {
  token: string | null
  expiration: number | null
} => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  const expiration = localStorage.getItem(LOCAL_STORAGE_EXPIRATION_KEY)

  return {
    token,
    expiration: expiration ? parseInt(expiration, 10) : null,
  }
}

export default Axios
