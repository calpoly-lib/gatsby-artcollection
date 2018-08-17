import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Media = ({ pageContext, data }) => {
  const { medium } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const mediumHeader = `${totalCount} ${
    totalCount === 1 ? "entry" : "entries"
  } in "${medium}"`

  return (
    <Layout>
      <h1>{mediumHeader}</h1>
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
      <Link to="/media">All media</Link>
    </Layout>
  )
}

export default Media

export const pageQuery = graphql`
  query($medium: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { medium: { in: [$medium] } } }
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