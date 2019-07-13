import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../utils/siteConfig'

const SEO = ({
  postNode,
  description,
  lang,
  title,
  pagePath,
  postSEO,
  pageSEO,
}) => {
  const metaDescription = description || config.siteDescription
  let pageTitle = config.siteTitle
  let pageUrl = config.siteUrl
  let pageType = 'website'
  let image = config.siteUrl + config.shareImage
  let imgWidth = config.shareImageWidth
  let imgHeight = config.shareImageHeight

  if (title) {
    pageTitle = `${title} | ${config.siteTitle}`
  }

  if (pagePath) {
    pageUrl = config.siteUrl + '/' + pagePath + '/'
    pageType = 'article'
  }

  if (postNode) {
    image = 'https:' + postNode.thumbnail.file.url
    imgWidth = postNode.thumbnail.file.details.image.width
    imgHeight = postNode.thumbnail.file.details.image.height
  }

  // Default Website Schema
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
  ]

  // Blog Post Schema
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': config.siteUrl,
              name: config.siteTitle,
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': pageUrl,
              name: title,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: pageUrl,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
          width: imgWidth,
          height: imgHeight,
        },
        author: {
          '@type': 'Person',
          name: config.author,
        },
        publisher: {
          '@type': 'Organization',
          name: config.publisher,
          url: config.siteUrl,
        },
        mainEntityOfPage: pageUrl,
      }
    )
  }

  // Page SEO Schema
  if (pageSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      url: pageUrl,
      name: title,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
    >
      {/* General tags */}
      <meta name="image" content={image} />
      <meta name="description" content={metaDescription} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
}

export default SEO
