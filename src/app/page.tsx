import { Metadata, ResolvingMetadata } from 'next'
import { BlogList } from '~/features/blog'
import { MarkdownRenderer } from '~/features/markdown'
import { ProductList } from '~/features/product'
import { Hero } from '~/features/profile'
import { api } from '~/lib/api'
import { css } from '~pandacss/css'

type Props = {}

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata,
): Promise<Metadata> {
  const parent = await resolvingParent

  return {
    openGraph: {
      ...parent?.openGraph,
      url: '/',
    },

    alternates: {
      canonical: '/',
    },
  }
}

export default async function Page() {
  const profile = await api.profile.get()
  const products = await api.products.list()
  const posts = await api.posts.list()

  if (!profile || !products || !posts) {
    throw new Error('API Error')
  }

  return (
    <>
      <Hero profile={profile.meta} />

      <MarkdownRenderer tree={profile.body} />

      <h2
        className={css({
          textStyle: 'display-small',
          fontFamily: 'comfortaa',
        })}
      >
        Products
      </h2>
      <ProductList items={products} />

      <h2
        className={css({
          textStyle: 'display-small',
          fontFamily: 'comfortaa',
        })}
      >
        Blog
      </h2>
      <BlogList items={posts} />
    </>
  )
}
