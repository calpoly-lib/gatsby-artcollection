import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"

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
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
