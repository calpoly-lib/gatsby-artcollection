import { Link } from "gatsby"

export default ({ post }) => {
  console.log(post.frontmatter.path);
  return (
    <div>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
  )
}
