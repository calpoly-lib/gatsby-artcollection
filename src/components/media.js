import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

export default class Media extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allCategories: allMarkdownRemark(
              limit: 2000
              filter: { fileAbsolutePath: { regex: "/catalog\/entries/" } }
            ) {
              group(field: frontmatter___medium) {
                fieldValue
                totalCount
              }
            }
          }
        `}
        render={data => {
          const listItems = data.allCategories.group.map(medium => (
            <li key={medium.fieldValue}>
            <Link to={`/media/${kebabCase(medium.fieldValue)}/`}>
              {medium.fieldValue} ({medium.totalCount})
            </Link>
          </li>
          ))
          return (
          <ul>{listItems}</ul>
        )}}
      />
    );
  }
}
