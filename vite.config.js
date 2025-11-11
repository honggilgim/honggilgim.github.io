import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // JavaScript 파일 확장자 명시적으로 .js로 설정
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // 모든 출력 파일이 .js 확장자를 가지도록 보장
        format: 'es'
      }
    },
    // 빌드 시 소스맵 생성 비활성화 (배포 시 불필요)
    sourcemap: false
  }
})

