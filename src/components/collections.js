import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allCategories: allMarkdownRemark(
          limit: 2000
          filter: { fileAbsolutePath: { regex: "/catalog\/entries/" } }
        ) {
          group(field: frontmatter___collection) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      const listItems = data.allCategories.group.map(collection => (
        <li key={collection.fieldValue}>
        <Link to={`/collections/${kebabCase(collection.fieldValue)}/`}>
          {collection.fieldValue} ({collection.totalCount})
        </Link>
      </li>
      ))
      return (
      <ul>{listItems}</ul>
    )}}
  />
)