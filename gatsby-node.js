const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  return graphql(
    `
      {
        allContentfulPost(sort: { fields: createdAt, order: DESC }) {
          edges {
            node {
              category
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
        component: postTemplate,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })

    // Create post-list.
    const categoryTemplates = result.data.allContentfulPost.edges

    const categoryCleanLists = categoryTemplates.filter(function(v1, i1, a1) {
      return (
        a1.findIndex(function(v2) {
          return v1.node.category === v2.node.category
        }) === i1
      )
    })

    categoryCleanLists.forEach(post => {
      createPage({
        path: `/category/${post.node.category}/`,
        component: categoryTemplate,
        context: {
          category: `${post.node.category}`,
        },
      })
    })

    return null
  })
}
