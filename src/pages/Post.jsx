import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { posts } from '../data/posts.jsx'
import './Post.css'
import 'highlight.js/styles/github-dark.css'

function Post() {
  const { id } = useParams()
  const post = posts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    )
  }

  return (
    <article className="post">
      <Link to="/" className="back-link">← Back to home</Link>
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <span className="post-date">{post.date}</span>
          {post.tags && post.tags.length > 0 && (
            <span className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </span>
          )}
        </p>
      </header>
      <div className="post-content">
        {post.markdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.markdownContent}
          </ReactMarkdown>
        ) : (
          post.content
        )}
      </div>
    </article>
  )
}

export default Post

