/**
 * public/thumbnails/KAKAO_SEND_MESSAGE.png 생성 (1200×630)
 * Windows: 맑은 고딕 bold 등록. 다른 OS에서는 시스템 폰트 폴백.
 */
import { createCanvas, registerFont } from 'canvas'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/thumbnails')
const outFile = path.join(outDir, 'KAKAO_SEND_MESSAGE.png')

const fontCandidates =
  os.platform() === 'win32'
    ? [
        path.join(process.env.WINDIR || 'C:\\Windows', 'Fonts', 'malgunbd.ttf'),
        'C:\\Windows\\Fonts\\malgunbd.ttf',
      ]
    : [
        '/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc',
        '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',
      ]

let fontFamily = 'sans-serif'
for (const fp of fontCandidates) {
  if (fp && fs.existsSync(fp)) {
    try {
      registerFont(fp, { family: 'KakaoThumb' })
      fontFamily = 'KakaoThumb'
      break
    } catch {
      /* continue */
    }
  }
}

const W = 1200
const H = 630
const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#FEE500'
ctx.fillRect(0, 0, W, H)

ctx.strokeStyle = 'rgba(25, 25, 25, 0.08)'
ctx.lineWidth = 2
ctx.strokeRect(48, 48, W - 96, H - 96)

const title = '카카오톡 송금 메시지 보내기'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillStyle = '#191919'

let fontSize = 72
const maxW = W - 140
for (;;) {
  ctx.font = `bold ${fontSize}px ${fontFamily}, "Malgun Gothic", sans-serif`
  if (ctx.measureText(title).width <= maxW || fontSize <= 36) break
  fontSize -= 2
}

ctx.fillText(title, W / 2, H / 2)

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, canvas.toBuffer('image/png'))
console.log('Wrote', outFile)
