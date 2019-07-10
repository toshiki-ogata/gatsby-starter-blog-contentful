import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
const config = require('../utils/siteConfig')

function SEO({ postNode, description, lang, meta, keywords, title, pagePath }) {
  const metaDescription = description || config.siteDescription
  let pageUrl = config.siteUrl
  let pageType = 'website'
  let image = config.siteUrl + config.shareImage
  let imgWidth = config.shareImageWidth
  let imgHeight = config.shareImageHeight

  if (pagePath) {
    pageUrl = config.siteUrl + '/' + pagePath + '/'
    pageType = 'article'
  }

  if (postNode) {
    image = 'https:' + postNode.thumbnail.file.url
    imgWidth = postNode.thumbnail.file.details.image.width
    imgHeight = postNode.thumbnail.file.details.image.height
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${config.siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: pageUrl,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:image:width`,
          content: imgWidth,
        },
        {
          property: `og:image:height`,
          content: imgHeight,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: pageType,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: config.userTwitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: image,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
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
  title: PropTypes.string.isRequired,
}

export default SEO
