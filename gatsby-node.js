/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

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
    graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content\/pages/|content\/posts|catalog\/entries/" } }
        ) {
          edges {
            node {
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
      const catalogEntries = items.filter(item => /catalog\/entries/.test(item.node.fileAbsolutePath));
      catalogEntries.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: catalogEntryTemplate,
          context: {
            slug,
          },
        })
      })

      resolve()
    })
  })
}
