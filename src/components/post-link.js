import { Link } from "gatsby"

export default ({ post }) => {
  return (
    <div>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
  )
}
