/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    if (/catalog\/entries/.test(node.fileAbsolutePath)) {
      createNodeField({
        node,
        name: 'slug',
        value: `/catalog${slug}`,
      })
    } else {
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const contentPageTemplate = path.resolve(`./src/templates/content-page.js`);
    const contentPostTemplate = path.resolve(`./src/templates/content-post.js`);
    const catalogEntryTemplate = path.resolve(`./src/templates/catalog-entry.js`);
    const collectionTemplate = path.resolve("src/templates/collections.js")
    const artistTemplate = path.resolve("src/templates/artists.js")
    const typeTemplate = path.resolve("src/templates/types.js")
    const mediumTemplate = path.resolve("src/templates/media.js")
    graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content\/pages/|content\/posts|catalog\/entries/" } }
        ) {
          edges {
            node {
              frontmatter {
                collection,
                artist,
                type,
                medium
              }
              fileAbsolutePath
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      const items = result.data.allMarkdownRemark.edges;
      // Create content pages
      const contentPages = items.filter(item => /content\/pages/.test(item.node.fileAbsolutePath));
      contentPages.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: contentPageTemplate,
          context: {
            slug,
          },
        })
      })

      // Create content posts
      const contentPosts = items.filter(item => /content\/posts/.test(item.node.fileAbsolutePath));
      contentPosts.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: contentPostTemplate,
          context: {
            slug,
          },
        })
      })

      // Create catalog entries
      // Collection pages:
      let collections = []
      let artists = []
      let types = []
      let media = []
      const catalogEntries = items.filter(item => /catalog\/entries/.test(item.node.fileAbsolutePath));
      catalogEntries.forEach(({ node }) => {
        const collection = node.frontmatter.collection
        if (!collections.includes(collection)) {
          collections.push(node.frontmatter.collection)
        }
        const artist = node.frontmatter.artist
        if (!artists.includes(artist)) {
          artists.push(node.frontmatter.artist)
        }
        const type = node.frontmatter.type
        if (!types.includes(type)) {
          types.push(node.frontmatter.type)
        }
        const medium = node.frontmatter.medium
        if (!media.includes(medium)) {
          media.push(node.frontmatter.medium)
        }
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: catalogEntryTemplate,
          context: {
            slug,
          },
        })
      })

      // Make collection pages
      collections.forEach(collection => {
        createPage({
          path: `/collections/${_.kebabCase(collection)}/`,
          component: collectionTemplate,
          context: {
            collection,
          },
        })
      })
      
      // Make artist pages
      artists.forEach(artist => {
        createPage({
          path: `/artists/${_.kebabCase(artist)}/`,
          component: artistTemplate,
          context: {
            artist,
          },
        })
      })
      
      // Make type pages
      types.forEach(type => {
        createPage({
          path: `/types/${_.kebabCase(type)}/`,
          component: typeTemplate,
          context: {
            type,
          },
        })
      })
      
      // Make medium pages
      media.forEach(medium => {
        createPage({
          path: `/media/${_.kebabCase(medium)}/`,
          component: mediumTemplate,
          context: {
            medium,
          },
        })
      })
      
      resolve()
    })
  })
}
