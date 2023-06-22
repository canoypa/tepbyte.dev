import axios from 'axios'
import { JWT } from 'google-auth-library'

const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
})

const API_ORIGIN = 'https://tepbyte-qy5wbcvsoq-an.a.run.app'

export const request = async <T = unknown>(path: string, params?: any) => {
  const url = new URL(path, API_ORIGIN).toString()

  const token = await client.fetchIdToken(path)

  const res = await axios.post<T>(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
