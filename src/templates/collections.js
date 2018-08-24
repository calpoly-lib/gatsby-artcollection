import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Gallery from "../components/gallery"

const Collections = ({ pageContext, data }) => {
  const { collection } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const collectionHeader = `${totalCount} ${
    totalCount === 1 ? "entry" : "entries"
  } in "${collection}"`
  const images = edges.map(({ node }) => {
    const { path, title, figure } = node.frontmatter
    return {
      id: figure[0].id,
      fluid: figure[0].file.childImageSharp.fluid,
      altText: title,
      captionText: figure[0].caption,
      captionHeader: title,
      url: path
    }
  })

  return (
    <Layout>
     <h2>{collectionHeader}</h2>
      <Gallery images={images} />
      <Link to="/collections">All collections</Link>
    </Layout>
  )
}

export default Collections

export const pageQuery = graphql`
  query($collection: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { collection: { in: [$collection] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            figure {
              id
              file {
                publicURL
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }             
                }
              }
              caption
              credit
            }
          }
        }
      }
    }
  }
`