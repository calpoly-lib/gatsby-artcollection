import React from 'react'
import { StaticQuery, graphql } from "gatsby"

// import PostLink from "../components/post-link"

export default () => (
  <StaticQuery
    query={graphql`
      {
        allPosts: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content\/posts/" } }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              excerpt(pruneLength: 250)
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>{JSON.stringify(data.allPosts.edges)}</>
    )}
  />
)