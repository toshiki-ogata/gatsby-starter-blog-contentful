const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryList = path.resolve(`./src/templates/category-list.js`)

  return graphql(
    `
      {
        allContentfulPost(sort: { fields: createdAt, order: DESC }) {
          edges {
            node {
              categoryName
              categorySlug
              title
              slug
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
    const posts = result.data.allContentfulPost.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `${post.node.slug}`,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })

    // Create post-list.
    const categoryLists = result.data.allContentfulPost.edges

    const categoryCleanLists = categoryLists.filter(function(v1, i1, a1) {
      return (
        a1.findIndex(function(v2) {
          return v1.node.categorySlug === v2.node.categorySlug
        }) === i1
      )
    })

    categoryCleanLists.forEach(post => {
      createPage({
        path: `/category/${post.node.categorySlug}/`,
        component: categoryList,
        context: {
          categorySlug: `${post.node.categorySlug}`,
          categoryName: `${post.node.categoryName}`,
        },
      })
    })

    return null
  })
}
