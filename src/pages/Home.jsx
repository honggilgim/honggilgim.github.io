import { Link } from 'react-router-dom'
import { posts } from '../data/posts.jsx'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to My Blog</h2>
        <p>개발과 일상에 대한 이야기를 공유합니다.</p>
      </section>
      
      <section className="posts-section">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <Link to={`/post/${post.id}`}>
                {post.thumbnail && (
                  <div className="post-thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                )}
                <div className="post-card-content">
                  <h3>{post.title}</h3>
                  <p className="post-date">{post.date}</p>
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
      </section>
    </div>
  )
}

export default Home

