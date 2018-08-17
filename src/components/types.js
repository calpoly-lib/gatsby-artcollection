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
          group(field: frontmatter___type) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      const listItems = data.allCategories.group.map(type => (
        <li key={type.fieldValue}>
        <Link to={`/types/${kebabCase(type.fieldValue)}/`}>
          {type.fieldValue} ({type.totalCount})
        </Link>
      </li>
      ))
      return (
      <ul>{listItems}</ul>
    )}}
  />
)