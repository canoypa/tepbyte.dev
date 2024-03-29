import { Metadata, ResolvingMetadata } from 'next'
import { BlogList } from '~/features/blog'
import { MainContents } from '~/features/main_contents'
import { PageHeadline } from '~/features/page_headline'
import { api } from '~/lib/api'

type Props = {}

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata,
): Promise<Metadata> {
  const parent = await resolvingParent

  return {
    title: 'Blog',

    openGraph: {
      ...parent?.openGraph,
      title: 'Blog',
      url: '/blog',
    },

    alternates: {
      canonical: '/blog',
    },
  }
}

export default async function Page() {
  const posts = await api.posts.list()

  if (!posts) {
    throw new Error('API Error')
  }

  return (
    <>
      <PageHeadline title="Blog" />
      <BlogList items={posts} />
    </>
  )
}
