import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { posts } from '../data/posts.jsx'
import { formatDate } from '../utils/dateFormatter'
import './Home.css'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const postsPerPage = 9

  // 메타데이터 설정
  useEffect(() => {
    // 페이지 타이틀 설정
    document.title = 'Honggil blog'
    
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
    updateMetaTag('og:title', 'Honggil blog', true)
    updateMetaTag('og:description', '개발과 일상에 대한 이야기를 공유합니다.', true)
    updateMetaTag('og:type', 'website', true)
    
    // Twitter Card 메타 태그
    updateMetaTag('twitter:card', 'summary')
    updateMetaTag('twitter:title', 'Honggil blog')
    updateMetaTag('twitter:description', '개발과 일상에 대한 이야기를 공유합니다.')
    
    // 기본 메타 태그
    updateMetaTag('description', '개발과 일상에 대한 이야기를 공유합니다.')
  }, [])

  // 작성일 기준 최신순으로 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // 내림차순 (최신이 먼저)
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = sortedPosts.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to My Blog</h2>
        <p>개발과 일상에 대한 이야기를 공유합니다.</p>
      </section>
      
      <section className="posts-section">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {currentPosts.map((post) => (
            <article key={post.id} className="post-card">
              <Link to={`/post/${post.id}`}>
                <div className="post-thumbnail">
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt={post.title} />
                  ) : (
                    <div className="post-thumbnail-placeholder"></div>
                  )}
                </div>
                <div className="post-card-content">
                  <h3>{post.title}</h3>
                  <p className="post-date">{formatDate(post.date)}</p>
                  <p className="post-excerpt">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-card-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="post-card-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-label={`페이지 ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home

