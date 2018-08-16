import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import rehypeReact from "rehype-react"

export default ({ slug }) => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
    },
  }).Compiler;

  return (
  <StaticQuery
    query={graphql`
      query {
        allPartials: 
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content\/partials/" } }
        ) {
          edges {
            node {
              htmlAst
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {
          renderAst((data.allPartials.edges.find((item) => item.node.fields.slug === slug)).node.htmlAst)
        }
      </>
    )}
  />
)}