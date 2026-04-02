/** posts 배열을 시리즈별로 묶어 사이드바 내비용 트리를 만든다. */
export function buildNavFromPosts(posts) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const bySeries = new Map()
  const uncategorized = []

  for (const p of sorted) {
    if (p.series) {
      if (!bySeries.has(p.series)) bySeries.set(p.series, [])
      bySeries.get(p.series).push(p)
    } else {
      uncategorized.push(p)
    }
  }

  const seriesList = [...bySeries.entries()].sort(([a], [b]) =>
    a.localeCompare(b, 'ko')
  )

  return { seriesList, uncategorized }
}
