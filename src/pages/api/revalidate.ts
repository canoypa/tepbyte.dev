import { NextApiRequest, NextApiResponse } from 'next'

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  if (request.body.token !== process.env.REVALIDATE_TOKEN) {
    return response.status(401).end()
  }

  try {
    await response.revalidate(request.body.path)
    return response.json({ revalidated: true })
  } catch (err) {
    return response.status(500).end()
  }
}
