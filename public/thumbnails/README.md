# 썸네일 이미지

이 폴더에 포스트 썸네일 이미지를 저장하세요.

## 사용 방법

1. 썸네일 이미지를 이 폴더에 저장합니다 (예: `java.png`)
2. `src/data/posts.jsx`에서 포스트에 `thumbnail` 필드를 추가합니다:
   ```javascript
   {
     id: 4,
     title: '자바 Wrapper Class',
     thumbnail: '/thumbnails/java.png',
     // ...
   }
   ```

## 이미지 권장 사양

- 크기: 1200x630px (또는 비율 1.91:1)
- 형식: PNG, JPG, WebP
- 파일 크기: 500KB 이하 권장

