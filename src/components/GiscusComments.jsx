import Giscus from '@giscus/react'
import { GISCUS } from '../config/giscus'
import './GiscusComments.css'

function GiscusComments() {
  return (
    <section className="giscus-comments" aria-label="댓글">
      <h2 className="giscus-comments__heading">댓글</h2>
      <Giscus
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
