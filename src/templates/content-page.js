import React from "react"
import { graphql, Link } from "gatsby"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import ListPosts from "../components/list-posts"
import Partial from "../components/partial"
import Collections from "../components/collections"
import Artists from "../components/artists"
import Types from "../components/types"
import Media from "../components/media"

export default ({ data }) => {
  const post = data.markdownRemark
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      "g-link": Link,
      "ac-list-posts": ListPosts,
      "ac-partial": Partial,
      "ac-collections": Collections,
      "ac-artists": Artists,
      "ac-types": Types,
      "ac-media": Media,
    },
  }).Compiler;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        {
          renderAst(post.htmlAst)
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
