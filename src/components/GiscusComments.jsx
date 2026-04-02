import Giscus from '@giscus/react'
import { useLocation } from 'react-router-dom'
import { GISCUS } from '../config/giscus'
import './GiscusComments.css'

/**
 * SPA에서는 라우트만 바뀌고 iframe이 갱신되지 않아 댓글이 한 스레드에만 묶일 수 있다.
 * pathname이 바뀔 때마다 key로 위젯을 다시 마운트한다.
 */
function GiscusComments() {
  const { pathname } = useLocation()

  return (
    <section className="giscus-comments" aria-label="댓글">
      <h2 className="giscus-comments__heading">댓글</h2>
      <Giscus
        key={pathname}
        id="giscus"
        repo={GISCUS.repo}
        repoId={GISCUS.repoId}
        category={GISCUS.category}
        categoryId={GISCUS.categoryId}
        mapping={GISCUS.mapping}
        strict={GISCUS.strict}
        reactionsEnabled={GISCUS.reactionsEnabled}
        emitMetadata={GISCUS.emitMetadata}
        inputPosition={GISCUS.inputPosition}
        theme={GISCUS.theme}
        lang={GISCUS.lang}
        loading="lazy"
      />
    </section>
  )
}

export default GiscusComments
