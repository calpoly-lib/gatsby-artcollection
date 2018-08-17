import React from "react"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"
import _ from "lodash"

import Layout from "../components/layout"
import Gallery from "../components/gallery"

export default ({ data }) => {
  const entry = data.markdownRemark
  const renderAst = new rehypeReact({
    createElement: React.createElement
  }).Compiler;
  return (
    <Layout>
      <div
        id="document"
        class="document "
        itemscope
        itemtype="http://schema.org/Thing"
      >
        <div id="{entry.frontmatter.id}">
          <h1 itemprop="name">{entry.frontmatter.title}</h1>
          <dl class="dl-horizontal  dl-invert">
            <dt class="ac-title_display">Title:</dt>
            <dd class="ac-title_display">{entry.frontmatter.title}</dd>
            <dt class="ac-artist_facet">Artist:</dt>
            <dd class="ac-artist_facet">
              <Link to={`/artists/${_.kebabCase(entry.frontmatter.artist)}/`}>{entry.frontmatter.artist}</Link>
            </dd>
            <dt class="ac-date_display">Date:</dt>
            <dd class="ac-date_display">{entry.frontmatter.year}</dd>
            <dt class="ac-description_display">Description:</dt>
            <dd class="ac-description_display">
              {renderAst(entry.htmlAst)}
            </dd>
            <dt class="ac-type_facet">Type:</dt>
            <dd class="ac-type_facet">
              <Link to={`/types/${_.kebabCase(entry.frontmatter.type)}/`}>{entry.frontmatter.type}</Link>
            </dd>
            <dt class="ac-medium_facet">Medium:</dt>
            <dd class="ac-medium_facet">
              <Link to={`/media/${_.kebabCase(entry.frontmatter.medium)}/`}>{entry.frontmatter.medium}</Link>
            </dd>
            <dt class="ac-collection_facet">Collection:</dt>
            <dd class="ac-collection_facet">
              <Link to={`/collections/${_.kebabCase(entry.frontmatter.collection)}/`}>{entry.frontmatter.collection}</Link>
            </dd>
            <dt class="ac-accession_display">
              Object Identifier (Accession #):
            </dt>
            <dd class="ac-accession_display">{entry.frontmatter.id}</dd>
            <dt class="ac-img_original_display">Picture{entry.frontmatter.figure.length === 1 ? "" : "s"}:</dt>
            <dd class="ac-img_original_display">
              <Gallery images={entry.frontmatter.figure} />
            </dd>
          </dl>
        </div>
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
