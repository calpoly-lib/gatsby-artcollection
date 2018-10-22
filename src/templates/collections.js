import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Collections = ({ pageContext, data }) => {
  const { collection } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const collectionHeader = `${totalCount} ${
    totalCount === 1 ? "entry" : "entries"
  } in "${collection}"`

  return (
    <Layout>
     <h1>{collectionHeader}</h1>
     <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          )
        })}
      </ul>
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
        }
      }
    }
  }
}
`
