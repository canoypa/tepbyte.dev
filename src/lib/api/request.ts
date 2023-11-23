import { JWT } from 'google-auth-library'

type RequestURL = URL | string
type RequestParams = URLSearchParams | { [key in any]: any }
type RequestBody = string | { [key in any]: any }

type InternalRequestOptions = {
  url: RequestURL
  params?: RequestParams
  body?: RequestBody
}

type RequestOptions = InternalRequestOptions &
  Omit<RequestInit, keyof InternalRequestOptions>

const buildURL = (url: RequestURL, params?: RequestParams) => {
  const result = new URL(url)

  if (params instanceof URLSearchParams) {
    params = Object.fromEntries(params.entries())
  }

  for (let k in params) {
    result.searchParams.set(k, params[k])
  }

  return result
}

const buildBody = (body?: RequestBody): string | null => {
  if (body === undefined || body === null) {
    return null
  }

  if (typeof body === 'string') {
    return body
  }

  return JSON.stringify(body)
}

const request = async (options: RequestOptions) => {
  const { url, params, body, ...requestInit } = options

  const requestObject = new Request(buildURL(url, params), {
    ...requestInit,
    body: buildBody(options.body),
  })

  const res = await fetch(requestObject)

  return res
}

const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
})

const API_ORIGIN = 'https://tepbyte-qy5wbcvsoq-an.a.run.app'

export const requestAPI = async <T = unknown>(path: string, body?: any) => {
  const url = new URL(path, API_ORIGIN).toString()

  const token = await client.fetchIdToken(path)

  const res = await request({
    method: 'POST',
    url,
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    return null
  }

  return (await res.json()) as T
}
