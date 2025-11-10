import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { posts } from '../data/posts.jsx'
import { formatDate } from '../utils/dateFormatter'
import './Post.css'
import 'highlight.js/styles/github-dark.css'

function Post() {
  const { id } = useParams()
  const postId = parseInt(id)
  const post = posts.find(p => p.id === postId)
  const currentIndex = posts.findIndex(p => p.id === postId)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  
  // 같은 시리즈의 포스트들
  const seriesPosts = post?.series 
    ? posts.filter(p => p.series === post.series).sort((a, b) => a.id - b.id)
    : []

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
      {post.thumbnail && (
        <div className="post-thumbnail-large">
          <img src={post.thumbnail} alt={post.title} />
        </div>
      )}
      <header className="post-header">
        <h1>{post.title}</h1>
        {post.series && (
          <div className="post-series">
            <span className="series-label">시리즈:</span>
            <span className="series-name">{post.series}</span>
          </div>
        )}
        <p className="post-meta">
          <span className="post-date">{formatDate(post.date)}</span>
          {post.tags && post.tags.length > 0 && (
            <span className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </span>
          )}
        </p>
      </header>
      
      {seriesPosts.length > 0 && (
        <div className="series-list">
          <h3 className="series-list-title">{post.series} 시리즈</h3>
          <ul className="series-posts">
            {seriesPosts.map((seriesPost, index) => (
              <li key={seriesPost.id} className={seriesPost.id === postId ? 'active' : ''}>
                <Link to={`/post/${seriesPost.id}`}>
                  <span className="series-number">{index + 1}.</span>
                  <span className="series-title">{seriesPost.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
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
      
      <div className="post-navigation">
        {prevPost && (
          <Link to={`/post/${prevPost.id}`} className="nav-link prev-post">
            <span className="nav-label">← 이전 글</span>
            <span className="nav-title">{prevPost.title}</span>
          </Link>
        )}
        {nextPost && (
          <Link to={`/post/${nextPost.id}`} className="nav-link next-post">
            <span className="nav-label">다음 글 →</span>
            <span className="nav-title">{nextPost.title}</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export default Post

