import React from 'react'

const Gallery = ({ images }) => {
  const listItems = images.map(image => (
    <li key="{image.id}">
      <a href={image.file.publicURL} target="_blank" rel="noopener noreferrer">
      <figure>
        <img src={image.file.childImageSharp.resize.src} alt={image.caption} />
        <figcaption>{image.caption}</figcaption>
      </figure>
      </a>
    </li>
  ))
  return <ul>{listItems}</ul>
}

export default Gallery
