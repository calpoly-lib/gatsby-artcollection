import React from 'react'
import { Link } from 'gatsby'

import './layout.css'
import './application.css'

export default ({ siteTitle }) => (
  <>
    <div id="logo">
      <a href="http://www.calpoly.edu">
        <img src="http://artcollection.calpoly.edu/assets/calpoly-6800f79f94a0ec949716357add65415fcc1033bba77ef3013b4671cbcc9de22e.jpg" alt="Cal Poly logo" />
      </a>
      <Link id="title" to="/">{siteTitle}</Link>
    </div>
    <ul class="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about/">About</Link>
      </li>
      <li>
        <Link to="/policies/">Policies</Link>
      </li>
      <li>
        <Link to="/class_visits/">Class Visits</Link>
      </li>
      <li>
        <Link to="/rfp/">Request for Proposals</Link>
      </li>
    </ul>
  </>
)
