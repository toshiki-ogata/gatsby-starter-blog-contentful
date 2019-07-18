*[English](README.md) ? [日本語](README-ja.md) 

# Gatsby Starter Blog Contentful

A starter template to build amazing static websites with Gatsby, Contentful and Netlify.

[Demo](https://gatsby-starter-blog-contentful.netlify.com/)

## Features

- Contentful integration with ready to go placeholder content
- Minimal responsive design - made to customize or tear apart
- Pagination logic
- Styled components
- SEO Friendly Component
  - JSON-LD Schema
  - OpenGraph sharing support
  - Sitemap Generation
- Google Analytics
- Progressive Web app
- Offline Support
- RSS Feed
- [Gatsby Standard module](https://www.npmjs.com/package/eslint-config-gatsby-standard) for linting Javascript with StandardJS
- Stylelint support for Styled Components to lint the CSS in JS

## Getting Started

### Install

```
git clone https://github.com/ryanwiemer/gatsby-starter-gcn.git
npm i
```

### Setup Contentful

1.  [Sign up](https://www.contentful.com/sign-up/) for Contentful and create a new empty space

2.  `npm run setup`

3.  Enter in the requested info for your Contentful space found here: **app.contentful.com** ? **Space Settings** ? **API keys**. You will need to provide both a standard API key (first tab) and a management key (second tab).

## Customization

### Website Data

Edit [`/src/utils/siteConfig.js`](https://github.com/ryanwiemer/gatsby-starter-gcn/blob/master/src/utils/siteConfig.js)

```js
module.exports = {
  siteTitle: 'Gatsby Starter Blog',
  siteTitleAlt: 'Gatsby Starter Blog',
  publisher: 'Publisher named Gatsby Starter Blog',
  siteDescription:
    'A starter template to build amazing static websites with Gatsby, Contentful and Netlify',
  footerAboutText:
    'A starter template to build amazing static websites with Gatsby, Contentful and Netlify',
  siteUrl: 'https://gatsby-starter-blog-contentful.netlify.com/',
  postsPerPage: 9,
  pickUpPosts: ['markdown-cheatsheet', 'sample-post-1', 'sample-post-2'],
  author: 'GSB User',
  userTwitter: '@twitter',
  shortTitle: 'GSB App',
  shareImage: '/assets/share.png',
  shareImageWidth: 1200,
  shareImageHeight: 630,
  siteLogo: '',
  siteIcon: '/logos/logo-512.png',
  backgroundColor: '#000',
  themeColor: '#121212',
  copyright: '? 2019 GSB User',
  social: {
    twitter: `https://twitter.com/`,
    facebook: `https://www.facebook.com/`,
    instagram: `https://www.instagram.com/`,
    youtube: `https://www.youtube.com/`,
    github: `https://github.com/`,
    rss: `/rss.xml`,
  },
}
```

**Note:** If you do not see your changes reflected when developing locally you may need to run `npm run clean` and restart the development server.

### Theme

Edit [`/src/styles/theme.js`](https://github.com/ryanwiemer/gatsby-starter-gcn/blob/master/src/styles/theme.js)

```js
const theme = {
  colors: {
    base: '#121212',
    secondary: '#e9e9e9',
    tertiary: '#f3f3f3',
    highlight: '#5b8bf7',
  },
  sizes: {
    maxWidth: '1200px',
    maxWidthCentered: '650px',
  },
  responsive: {
    small: '35em',
    medium: '50em',
    large: '70em',
  },
}
```

### Using Gatsby Standard

1.  Quickly check your code for errors with the `npm test` script
2.  You can view the [Gatsby Standard README](https://github.com/brandonkal/eslint-config-gatsby-standard) for details on how to integrate this project's included Gatsby Standard, Stylelint, and Prettier modules into your text editor

### Content and SEO

1.  You can replace the `share.jpg` and `logo-512` files in the `static/logos` directory. After replacing these files ensure that you edit the image size dimensions specified in `/src/utils/siteConfig.js`
2.  Meta descriptions are defined in Contentful. If you choose to leave this field blank on new posts a 320 character excerpt of the post/page will be used.
3.  **IMPORTANT:** Be sure to manually enter at least one meta description on a page and post in Contentful or the site will fail to build.

## Deployment

### Manual Netlify Deployment

1.  Run `gatsby build`

2.  Drag and drop the folder `/public/` into Netlify

### Netlify Deployment From Git (Recommended)

1.  [New Netlify website from Git](https://app.netlify.com/start)

2.  Connect with GitHub and select your repo

3.  Navigate to Netlify: **Settings** ? **Build & Deploy** ? **Build Environment Variables**. Add the following environment variables using the Space ID and Content Delivery API - access token from Contentful. Additionally if desired you can enter a Google Analytics ID. The variables must be named exactly like this in order to work properly.

```
ACCESS_TOKEN
SPACE_ID
GOOGLE_ANALYTICS
```

4.  Navigate to Netlify: **Deploys**. Click `Trigger deploy` to manually trigger a deploy to confirm the website is building successfully using your build environment variables. At this point be aware that every time you push to `master` a deploy will automatically start and be published to production.

## Additional Settings

### Contentful Webhook (Optional)

1.  Navigate to Netlify:
    **Settings** ? **Build & Deploy** ? **Build hooks**.
    Create a new build hook.

2.  Navigate to Contentful:
    **app.contentful.com** ? **Space Settings** ? **Webhooks**. Create a webhook using the Netlify build URL that you just created
    and configure which events should trigger the build on production. For example the following will rebuild the production website every time a post or page is published, unpublished or deleted:
