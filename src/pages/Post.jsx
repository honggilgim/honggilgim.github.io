import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { posts } from '../data/posts.jsx'
import { formatDate } from '../utils/dateFormatter'
import './Post.css'
import 'highlight.js/styles/github.css'
import { SITE_TITLE } from '../config/site'
import { toCategoryPath } from '../utils/categoryPath'

function Post() {
  const { id } = useParams()
  const postId = parseInt(id)
  const post = posts.find(p => p.id === postId)
  const currentIndex = posts.findIndex(p => p.id === postId)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  
  // 메타데이터 설정
  useEffect(() => {
    if (post) {
      // 페이지 타이틀 설정
      document.title = `${post.title} | ${SITE_TITLE}`
      
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
      document.title = SITE_TITLE
    }
  }, [post])

  if (!post) {
    return (
      <div className="post-not-found">
        <nav className="post-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <span className="post-breadcrumb__sep"> &gt; </span>
          <span className="post-breadcrumb__current">Not found</span>
        </nav>
        <h2>Post not found</h2>
        <Link to="/">홈으로</Link>
      </div>
    )
  }

  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-byline">
          <span
            className={`post-byline__category${
              post.series ? '' : ' post-byline__category--empty'
            }`}
          >
            {post.series ? (
              <Link
                to={toCategoryPath(post.series)}
                className="post-byline__category-link"
              >
                {post.series}
              </Link>
            ) : (
              '—'
            )}
          </span>
          <span className="post-byline__dash" aria-hidden>
            {' '}
          </span>
          <time className="post-byline__date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="post-byline__trail" aria-hidden>
            {' '}
            — —
          </span>
        </p>
        {post.tags && post.tags.length > 0 && (
          <p className="post-tags-line">
            <span className="post-tags-line__label">Tag :</span>
            {post.tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && ' '}
                <span className="post-tags-line__tag">{tag}</span>
              </span>
            ))}
          </p>
        )}
        <nav className="post-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <span className="post-breadcrumb__sep" aria-hidden>
            {' '}
            &gt;{' '}
          </span>
          {post.series ? (
            <>
              <Link
                to={toCategoryPath(post.series)}
                className="post-breadcrumb__muted"
              >
                {post.series}
              </Link>
              <span className="post-breadcrumb__sep" aria-hidden>
                {' '}
                &gt;{' '}
              </span>
            </>
          ) : null}
          <span className="post-breadcrumb__current">{post.title}</span>
        </nav>
      </header>

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

