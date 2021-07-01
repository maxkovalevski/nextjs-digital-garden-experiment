import Link from 'next/link'

export default function Post({ post }) {
  return (
    <div>
      <img style={{maxWidth: '300px'}} src={post.frontmatter.cover_image} alt='' />

      <div>Posted on {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a>Read More</a>
      </Link>
    </div>
  )
}
