module.exports = {
  siteMetadata: {
    title: 'University Art Collection',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs']
      }
    },
  ],
  pathPrefix: '/gatsby-artcollection'
}
