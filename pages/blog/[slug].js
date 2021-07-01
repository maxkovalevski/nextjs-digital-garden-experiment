import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return (
    <>
      <Link href='/'>
        <a>Go Back</a>
      </Link>
      <div>
        <h1>{title}</h1>
        <div>Posted on {date}</div>
        <img src={cover_image} alt='' />
        <div>
          {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div> */}
          <ReactMarkdown uriTransformer={null}>{content}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '').replaceAll(' ', '-'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

function replaceWikiLinks(markdown) {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, function(allPattern, link) {
    // search for link title
    let linkTitle = link.replace(/\|([^\|]+)/, "")

    // search for page name
    let pageName = link.replace(/([^\|]+)\|/, "").replaceAll(" ", "-")

    if(!linkTitle){
      linkTitle = link
    }

    if (!pageName){
      pageName = link.replace(" ", "-")
    }

    // make sure page name has correct format
    link = pageName.replace(" ", "-")

    // convert [[<link title> | <page name>]] to [<link title>](<page name>)
    link = `[${linkTitle}](${pageName})`

    return link
  })
}

export async function getStaticProps({ params: { slug: slugData } }) {
  let slug = slugData;
  let markdownWithMeta = '';

  if (fs.existsSync(path.join('posts', slug.replaceAll('-', ' ') + '.md'))) {
    slug = slug.replaceAll('-', ' ');
  }

  markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content: data } = matter(markdownWithMeta)

  const content = replaceWikiLinks(data);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
