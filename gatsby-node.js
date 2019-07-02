const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryList = path.resolve(`./src/templates/category-list.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                categoryName
                categorySlug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create post-list.
    const categoryLists = result.data.allMarkdownRemark.edges

    const categoryCleanLists = categoryLists.filter(function(v1, i1, a1) {
      return (
        a1.findIndex(function(v2) {
          return (
            v1.node.frontmatter.categorySlug ===
            v2.node.frontmatter.categorySlug
          )
        }) === i1
      )
    })

    categoryCleanLists.forEach(post => {
      createPage({
        path: `/category/${post.node.frontmatter.categorySlug}/`,
        component: categoryList,
        context: {
          categorySlug: `${post.node.frontmatter.categorySlug}`,
          categoryName: `${post.node.frontmatter.categoryName}`,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
