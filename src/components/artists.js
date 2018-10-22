import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

export default class Artists extends Component {
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
              group(field: frontmatter___artist) {
                fieldValue
                totalCount
              }
            }
          }
        `}
        render={data => {
          const listItems = data.allCategories.group.map(artist => (
            <li key={artist.fieldValue}>
            <Link to={`/artists/${kebabCase(artist.fieldValue)}/`}>
              {artist.fieldValue} ({artist.totalCount})
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
