import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import Gallery from "../components/gallery"

export default ({ data }) => {
  const entry = data.markdownRemark
  const renderAst = new rehypeReact({
    createElement: React.createElement
  }).Compiler;
  return (
    <Layout>
      <div>
        <h1>{entry.frontmatter.title}</h1>
        {
          renderAst(entry.htmlAst)
        }
        <Gallery images={entry.frontmatter.figure} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        id
        title
        collection
        artist
        type
        medium
        date
        figure {
          id
          file {
            publicURL
            childImageSharp {
              resize(width: 200) {
                src
              }
            }
          }
          caption
          credit
        }
      }
    }
  }
`
