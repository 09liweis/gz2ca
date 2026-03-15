export const usePageSeo = (options: {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  noIndex?: boolean
}) => {
  const {
    title,
    description,
    keywords,
    ogImage,
    noIndex = false
  } = options

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
      ...(noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [])
    ]
  })
}
