import React from "react"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"
import _ from "lodash"

import Layout from "../components/layout"
import Gallery from "../components/gallery"

export default ({ data }) => {
  const entry = data.markdownRemark
  const images = entry.frontmatter.figure.map(figure => {
    return {
      id: figure.id,
      fluid: figure.file.childImageSharp.fluid,
      altText: figure.caption,
      captionText: figure.caption,
      captionHeader: '',
      url: figure.file.publicURL
    }
  }) 
  const renderAst = new rehypeReact({
    createElement: React.createElement
  }).Compiler;
  return (
    <Layout>
      <div
        id="document"
        className="document "
        itemScope
        itemType="http://schema.org/Thing"
      >
        <div id="{entry.frontmatter.id}">
          <h1 itemProp="name">{entry.frontmatter.title}</h1>
          <dl className="dl-horizontal  dl-invert">
            <dt className="ac-title_display">Title:</dt>
            <dd className="ac-title_display">{entry.frontmatter.title}</dd>
            <dt className="ac-artist_facet">Artist:</dt>
            <dd className="ac-artist_facet">
              <Link to={`/artists/${_.kebabCase(entry.frontmatter.artist)}/`}>{entry.frontmatter.artist}</Link>
            </dd>
            <dt className="ac-date_display">Date:</dt>
            <dd className="ac-date_display">{entry.frontmatter.year}</dd>
            <dt className="ac-description_display">Description:</dt>
            <dd className="ac-description_display">
              {renderAst(entry.htmlAst)}
            </dd>
            <dt className="ac-type_facet">Type:</dt>
            <dd className="ac-type_facet">
              <Link to={`/types/${_.kebabCase(entry.frontmatter.type)}/`}>{entry.frontmatter.type}</Link>
            </dd>
            <dt className="ac-medium_facet">Medium:</dt>
            <dd className="ac-medium_facet">
              <Link to={`/media/${_.kebabCase(entry.frontmatter.medium)}/`}>{entry.frontmatter.medium}</Link>
            </dd>
            <dt className="ac-collection_facet">Collection:</dt>
            <dd className="ac-collection_facet">
              <Link to={`/collections/${_.kebabCase(entry.frontmatter.collection)}/`}>{entry.frontmatter.collection}</Link>
            </dd>
            <dt className="ac-accession_display">
              Object Identifier (Accession #):
            </dt>
            <dd className="ac-accession_display">{entry.frontmatter.id}</dd>
            <dt className="ac-img_original_display">Picture{entry.frontmatter.figure.length === 1 ? "" : "s"}:</dt>
            <dd className="ac-img_original_display">
              <Gallery images={images} />
            </dd>
            <dt className="ac-credit">
              Credit:
            </dt>
            <dd className="ac-credit">{entry.frontmatter.credit}</dd>
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
        credit
        date
        figure {
          id
          file {
            publicURL
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }             
            }
          }
          caption
        }
      }
    }
  }
`
