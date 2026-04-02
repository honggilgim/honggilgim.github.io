/** 시리즈(카테고리)명으로 목록 페이지 경로를 만든다. */
export function toCategoryPath(seriesName) {
  return `/category/${encodeURIComponent(seriesName)}`
}

/** 라우트 파라미터를 안전하게 디코딩한다. */
export function decodeSeriesParam(param) {
  if (param == null || param === '') return ''
  try {
    return decodeURIComponent(param)
  } catch {
    return param
  }
}
