import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Artists = ({ pageContext, data }) => {
  const { artist } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const artistHeader = `${totalCount} ${
    totalCount === 1 ? "entry" : "entries"
  } in "${artist}"`

  return (
    <Layout>
      <h1>{artistHeader}</h1>
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
      <Link to="/artists">All artists</Link>
    </Layout>
  )
}

export default Artists

export const pageQuery = graphql`
  query($artist: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { artist: { in: [$artist] } } }
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