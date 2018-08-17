import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Types = ({ pageContext, data }) => {
  const { type } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const typeHeader = `${totalCount} ${
    totalCount === 1 ? "entry" : "entries"
  } in "${type}"`

  return (
    <Layout>
      <h1>{typeHeader}</h1>
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
      <Link to="/types">All types</Link>
    </Layout>
  )
}

export default Types

export const pageQuery = graphql`
  query($type: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { type: { in: [$type] } } }
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