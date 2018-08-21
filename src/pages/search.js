import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { ReactiveBase, CategorySearch, ReactiveList, SingleList, SelectedFilters } from '@appbaseio/reactivesearch';

import Layout from '../components/layout'

export default () => (
<StaticQuery
    query={graphql`
      query {
        allFigures:allMarkdownRemark(
          limit: 2000
          filter: { fileAbsolutePath: { regex: "/catalog\/entries/" } }
        ) {
          edges {
            node {
              frontmatter {
                figure {
                  id
                  caption
                  file {
                    childImageSharp {
                      resize(width: 200) {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}

    render={data => {
      return (
    <Layout>
    <ReactiveBase
    app="artcollection"
    credentials="CxtqoVLx0:813ed90c-e2b2-4e36-83a9-ba06b917b2d8">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
          <CategorySearch
            title=""
            dataField={['preferred_labels', 'ca_entities.related.keyword']}
            categoryField="ca_collections.keyword"
            componentId="search"
            style={{
              marginBottom: "15px"
            }}
          />
          <SelectedFilters />
          <SingleList
            componentId="collection"
            dataField="ca_collections.keyword"
            title="Collection"
            showSearch={false}
            showRadio={false}
            react={{
              and: ["search", "collection", "artist", "type", "medium"]
            }}          
            style={{
              marginBottom: "15px"
            }}
          />
          <SingleList
            componentId="artist"
            dataField="ca_entities.related.keyword"
            title="Artist"
            showSearch={false}
            showRadio={false}
            react={{
              and: ["search", "collection", "artist", "type", "medium"]
            }}          
            style={{
              marginBottom: "15px"
            }}
          />
          <SingleList
            componentId="type"
            dataField="type_id.keyword"
            title="Type"
            showSearch={false}
            showRadio={false}
            react={{
              and: ["search", "collection", "artist", "type", "medium"]
            }}          
            style={{
              marginBottom: "15px"
            }}
          />
          <SingleList
            componentId="medium"
            dataField="ca_objects.work_medium.keyword"
            title="Medium"
            showSearch={false}
            showRadio={false}
            react={{
              and: ["search", "collection", "artist", "type", "medium"]
            }}          
          />
        </div>
        <ReactiveList
          componentId="SearchResult"
          title="Results"
          dataField="preferred_labels"
          from={0}
          size={6}
          pagination={true}
          react={{
            and: ["search", "collection", "artist", "type", "medium"]
          }}          
          onData={(res) => {
            const original = res['ca_object_representations.media.original'].replace(/<img src='http:\/\/artcollection.calpoly.edu\/media\/collectiveaccess\/images\/\d\/(.+)' width='\d+' height='\d+'.*/g,"$1")
            const edge = data.allFigures.edges.find(edge => {
              return `${edge.node.frontmatter.figure[0].id}.jpg` === original
            })
            let imageSrc = ""
            let imageDescription = ""
            if (edge) {
              const figure = edge.node.frontmatter.figure[0]
              imageDescription = figure.caption
              imageSrc = figure.file.childImageSharp.resize.src
            }
            return (
              <div key={res.idno}>
                <div>
                  <dl className="dl-horizontal  dl-invert">
                    <dt className="ac-title_display">Title:</dt>
                    <dd className="ac-title_display"><Link to= {`/catalog/${res.idno}/`}>{res['preferred_labels']}</Link></dd>
                  </dl>
                  <figure>
                    <img src={imageSrc} alt={imageDescription} />
                  </figure>
                </div>
              </div>
            )
          }}
          style={{
            width: "60%",
            textAlign: "center"
          }}
        />
      </div>
    </ReactiveBase>
  </Layout>)}}
  />
)
