import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts.jsx'
import { formatDate } from '../utils/dateFormatter'
import { SITE_TITLE } from '../config/site'
import { decodeSeriesParam } from '../utils/categoryPath'
import './Home.css'
import './Category.css'

function Category() {
  const { seriesName: seriesParam } = useParams()
  const seriesName = decodeSeriesParam(seriesParam)

  const seriesPosts = useMemo(() => {
    if (!seriesName) return []
    return [...posts]
      .filter((p) => p.series === seriesName)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [seriesName])

  useEffect(() => {
    document.title =
      seriesName && seriesPosts.length
        ? `${seriesName} | ${SITE_TITLE}`
        : seriesName
          ? `${seriesName} (글 없음) | ${SITE_TITLE}`
          : SITE_TITLE
    return () => {
      document.title = SITE_TITLE
    }
  }, [seriesName, seriesPosts.length])

  return (
    <div className="category">
      <nav className="category-breadcrumb" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span className="category-breadcrumb__sep" aria-hidden>
          {' '}
          &gt;{' '}
        </span>
        <span className="category-breadcrumb__current">{seriesName || '카테고리'}</span>
      </nav>

      <header className="category-header">
        <h1 className="category-title">{seriesName || '카테고리'}</h1>
        <p className="category-meta">
          {seriesPosts.length > 0
            ? `글 ${seriesPosts.length}개`
            : '이 이름과 일치하는 시리즈가 없습니다.'}
        </p>
      </header>

      {seriesPosts.length > 0 && (
        <section className="posts-section">
          <div className="posts-grid">
            {seriesPosts.map((post) => (
              <article key={post.id} className="post-card">
                <Link to={`/post/${post.id}`}>
                  <div className="post-thumbnail">
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt={post.title} />
                    ) : (
                      <div className="post-thumbnail-placeholder" />
                    )}
                  </div>
                  <div className="post-card-content">
                    <h3>{post.title}</h3>
                    <p className="post-date">{formatDate(post.date)}</p>
                    <p className="post-excerpt">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-card-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="post-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <p className="category-back">
        <Link to="/">← 홈으로</Link>
      </p>
    </div>
  )
}

export default Category
