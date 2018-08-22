import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Search from './search'
import './layout.css'
import './application.css'

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <div id="center">
          <div class="wrapper">
            <Header siteTitle={data.site.siteMetadata.title} />
            <div id="sidebar" class="col-md-3 col-sm-4">
              <div id="facets" class="facets sidenav">
                <Search classNames={'link_bold'}/>
                <ul>
                  <li><Link to="/collections/">Collections</Link></li>
                  <li><Link to="/artists/">Artists</Link></li>
                  <li><Link to="/types/">Types</Link></li>
                  <li><Link to="/media/">Media</Link></li>             
                </ul>
              </div>
            </div>
            <div id="content" class="col-md-9 col-sm-8">
              <div id="home">
                {children}
              </div>

            </div>
          </div>
          <footer>
            <p>
              <a href="http://lib.calpoly.edu" target="_blank" rel="noopener noreferrer">Robert E. Kennedy Library</a> |
              <a href="http://www.calpoly.edu" target="_blank" rel="noopener noreferrer">California Polytechnic State University</a> | 1 Grand Ave, San Luis Obispo, CA 93407 |
              <a href="mailto:lib-artcollection@calpoly.edu">lib-artcollection@calpoly.edu</a> | (805) 756-6395</p>
          </footer>            
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
