module.exports = {
  siteMetadata: {
    title: 'University Art Collection',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-1814832-1",
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'partials',
        path: `${__dirname}/content/partials`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'entries',
        path: `${__dirname}/catalog/entries`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 1080,
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
              // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
              name: 'en',
              // A function for filtering nodes. () => true by default
              // filterNodes: node => node.frontmatter.lang === 'en',
              // Add to index custom entries, that are not actually extracted from gatsby nodes
              customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
            { name: 'title', store: true, attributes: { boost: 20 } },
            { name: 'collection', store: true },
            { name: 'idno', store: true },
            { name: 'type', store: true },
            { name: 'medium', store: true },
            { name: 'content' },
            { name: 'url', store: true },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
            // For any node of type MarkdownRemark, list how to resolve the fields' values
            MarkdownRemark: {
                title: node => node.frontmatter.title,
                collection: node => node.frontmatter.collection,
                idno: node => node.frontmatter.id,
                type: node => node.frontmatter.type,
                medium: node => node.frontmatter.medium,
                content: node => node.rawMarkdownBody,
                url: node => node.fields.slug,
            },
        },
      },
    },    
  ],
  pathPrefix: '/gatsby-artcollection'
}
