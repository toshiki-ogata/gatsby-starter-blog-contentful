const path = require(`path`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allContentfulPost(sort: { fields: createdAt, order: DESC }) {
          edges {
            node {
              slug
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

    const posts = result.data.allContentfulPost.edges

    // Create post pages
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `${post.node.slug}`,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })

    // Create category pages
    let categorys = []

    _.each(posts, edge => {
      if (_.get(edge, "node.category")) {
        categorys = categorys.concat(edge.node.category)
      }
    })

    categorys = _.uniq(categorys)

    categorys.forEach(category => {
      createPage({
        path: `/category/${category}/`,
        component: path.resolve(`./src/templates/category.js`),
        context: {
          category: `${category}`,
        },
      })
    })

    // Create tag pages
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
        component: path.resolve(`./src/templates/tag.js`),
        context: {
          tag,
        },
      })
    })

    return null
  })
}
