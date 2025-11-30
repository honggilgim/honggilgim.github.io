import { useState, useEffect } from 'react'
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
  
  const [isSeriesExpanded, setIsSeriesExpanded] = useState(false)

  // 메타데이터 설정
  useEffect(() => {
    if (post) {
      // 페이지 타이틀 설정
      document.title = `${post.title} - Honggil blog`
      
      // 메타 태그 설정
      const updateMetaTag = (name, content, isProperty = false) => {
        const attribute = isProperty ? 'property' : 'name'
        let meta = document.querySelector(`meta[${attribute}="${name}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute(attribute, name)
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
      }

      // Open Graph 메타 태그
      updateMetaTag('og:title', post.title, true)
      updateMetaTag('og:description', post.excerpt || '', true)
      updateMetaTag('og:type', 'article', true)
      if (post.thumbnail) {
        updateMetaTag('og:image', window.location.origin + post.thumbnail, true)
      }
      
      // Twitter Card 메타 태그
      updateMetaTag('twitter:card', 'summary_large_image')
      updateMetaTag('twitter:title', post.title)
      updateMetaTag('twitter:description', post.excerpt || '')
      if (post.thumbnail) {
        updateMetaTag('twitter:image', window.location.origin + post.thumbnail)
      }
      
      // 기본 메타 태그
      updateMetaTag('description', post.excerpt || '')
      updateMetaTag('keywords', post.tags ? post.tags.join(', ') : '')
    }

    // 컴포넌트 언마운트 시 기본값으로 복원
    return () => {
      document.title = 'Honggil blog'
    }
  }, [post])

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
        {post.series && (
          <div className="post-series">
            <span className="series-label">시리즈:</span>
            <span className="series-name">{post.series}</span>
          </div>
        )}
        <div className="post-meta">
          <span className="post-date">{formatDate(post.date)}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {seriesPosts.length > 0 && (
        <div className="series-list">
          <div className="series-list-header">
            <h3 className="series-list-title">{post.series} 시리즈</h3>
            <button 
              className={`series-toggle-btn ${isSeriesExpanded ? 'expanded' : ''}`}
              onClick={() => setIsSeriesExpanded(!isSeriesExpanded)}
              aria-label={`시리즈 목록 ${isSeriesExpanded ? '접기' : '펼치기'}`}
            >
              <span className="chevron-icon"></span>
            </button>
          </div>
          <div className={`series-posts-container ${isSeriesExpanded ? 'expanded' : ''}`}>
            <ul className="series-posts">
              {seriesPosts.map((seriesPost, index) => (
                <li key={seriesPost.id} className={seriesPost.id === postId ? 'active' : ''}>
                  <Link to={`/post/${seriesPost.id}`}>
                    {seriesPost.id === postId && <span className="series-arrow">→</span>}
                    <span className="series-number">{index + 1}.</span>
                    <span className="series-title">{seriesPost.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {post.thumbnail && (
        <div className="post-thumbnail-large">
          <img src={post.thumbnail} alt={post.title} />
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

