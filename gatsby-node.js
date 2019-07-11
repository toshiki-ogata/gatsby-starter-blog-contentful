const path = require(`path`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)

  return graphql(
    `
      {
        allContentfulPost(sort: { fields: createdAt, order: DESC }) {
          edges {
            node {
              slug
              title
              category
              tag
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create post
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

    // Create category
    const categoryCleanLists = posts.filter(function(v1, i1, a1) {
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

    // Create tag
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.tag")) {
        tags = tags.concat(edge.node.tag)
      }
    })

    tags = _.uniq(tags)

    tags.forEach(tag => {
      createPage({
        path: `/tag/${tag}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })

    return null
  })
}
