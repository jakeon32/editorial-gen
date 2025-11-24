# Editorial Layout Generator - Development Notes

## 프로젝트 개요

Editorial Layout Generator는 편집 디자인 레이아웃을 빠르게 프로토타이핑할 수 있는 웹 애플리케이션입니다. 사용자 정의 콘텐츠와 파라미터를 기반으로 텍스트와 이미지를 미적으로 결합한 레이아웃을 생성합니다.

## 기술 스택

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Icons**: Lucide React 0.554.0
- **Language**: JavaScript (ES6+)

## 아키텍처

### 핵심 컴포넌트

```
src/
├── App.jsx                 # 메인 애플리케이션 컴포넌트
├── utils/
│   └── bspLayout.js       # BSP 알고리즘 레이아웃 생성기
├── main.jsx               # 앱 진입점
└── index.css              # Tailwind CSS imports
```

### 주요 기능 모듈

#### 1. 레이아웃 시스템

4가지 레이아웃 타입을 지원:

- **Hero Layout** (1 이미지)
  - 전면 히어로 스타일
  - 그라디언트 오버레이
  - 텍스트 중앙 정렬

- **Split Layout** (2 이미지)
  - 반반 분할 구조
  - 좌측: 이미지, 우측: 텍스트 + 서브 이미지
  - 반응형 md 브레이크포인트

- **Minimal Grid Layout** (3-6 이미지)
  - 2열 그리드 구조
  - 좌측: 텍스트 + 메인 이미지
  - 우측: 그리드 이미지 배열

- **Mosaic Layout** (2-16 이미지)
  - BSP 알고리즘 기반 동적 그리드
  - 콘텐츠 블록 포함 가능
  - 가변 셀 크기

#### 2. BSP (Binary Space Partitioning) 알고리즘

`src/utils/bspLayout.js`에 구현된 핵심 알고리즘:

```javascript
// 12x12 기본 그리드
// 재귀적 분할을 통한 레이아웃 생성
// 전략:
//   - 60%: 가장 큰 블록 분할 (균형)
//   - 40%: 랜덤 블록 분할 (대비)
// 분할 비율: 1/2, 1/3, 랜덤
```

**특징:**
- 최소 블록 크기: 2/12 (16.6%)
- 콘텐츠 블록 자동 배치
- 적합성 필터링 (텍스트용 최소 4x2)

#### 3. 동적 스타일 생성

```javascript
generateImageStyles(count, dynamicLevel)
// dynamicLevel: 0-100
// 회전: ±8° * intensity
// 스케일: 1.02 ~ 1.27
// 위치 오프셋: ±intensity
```

### 상태 관리

React Hooks 사용:

```javascript
// 콘텐츠 상태
const [content, setContent] = useState({
  title, subtitle, description, tag,
  showSubtitle, showTag, showImageName, showImageCaption
})

// 설정 상태
const [config, setConfig] = useState({
  aspectRatio,      // 종횡비
  structure,        // 0-100: 동적 레벨
  contentScale,     // 0.5-1.5x: 텍스트 크기
  defaultImageCount, // 1-16: 기본 이미지 수
  accentColor,      // HEX
  backgroundColor   // HEX
})

// 페이지 배열
const [pages, setPages] = useState([])
```

### UI 구조

#### 좌측 제어 패널 (320px)
- Canvas: 종횡비 선택
- Parameters: 슬라이더 (Structure, Size, Image Count)
- Colors: 컬러 피커
- Content: 텍스트 입력 + 토글

#### 우측 프리뷰 영역
- 페이지 카드 리스트
- 페이지별 컨트롤:
  - 이미지 개수 조절 (±)
  - 레이아웃 셔플
  - HTML 다운로드
  - 페이지 삭제

## 핵심 기능 구현

### 1. 적응형 레이아웃 선택

```javascript
const getRandomLayoutForCount = (count) => {
  const suitable = layoutTypes.filter(
    lt => count >= lt.minImages && count <= lt.maxImages
  );
  return suitable[Math.floor(Math.random() * suitable.length)].id;
}
```

### 2. HTML 내보내기

- Tailwind CDN 포함
- Google Fonts 로드
- 인라인 스타일 적용
- Blob URL 생성 → 자동 다운로드

### 3. 이미지 오류 처리

```javascript
const EditorialImage = ({ src, ... }) => {
  const [error, setError] = useState(false);
  if (error) return <ImageOff fallback />;
  return <img onError={() => setError(true)} />;
}
```

## 스타일링 전략

### Tailwind CSS 4.x 사용

- `@import "tailwindcss"` (PostCSS)
- Utility-first 접근
- 동적 클래스: `aspect-[16/9]`

### 인라인 스타일

동적 값에 사용:
- 변환 (transform)
- 색상 (accentColor, backgroundColor)
- 폰트 크기 (contentScale 기반)

## 성능 최적화

### 1. 이미지 최적화
- Unsplash 이미지: `w=800&q=80`
- 객체 커버: `object-cover`
- 트랜지션: `duration-500` ~ `duration-700`

### 2. 렌더링 최적화
- 키 기반 리스트 렌더링
- 조건부 렌더링 (`&&`)
- CSS 트랜지션 (GPU 가속)

## 배포

### GitHub Pages

- **Base Path**: `/editorial-gen/`
- **빌드**: `npm run build`
- **배포**: GitHub Actions (자동)

### Workflow

```yaml
on: push (main 브랜치)
jobs:
  - build (Node 20, npm ci, npm run build)
  - deploy (GitHub Pages)
```

## 개발 가이드

### 로컬 개발

```bash
npm install
npm run dev
# http://localhost:5173
```

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

### 새 레이아웃 추가

1. 레이아웃 컴포넌트 생성:
```javascript
const LayoutNewType = ({ data, images, styles, accentColor, backgroundColor, contentScale }) => {
  // 구현
}
```

2. `layoutTypes` 배열에 등록:
```javascript
const layoutTypes = [
  // ...
  { id: 'new-type', comp: LayoutNewType, minImages: X, maxImages: Y }
]
```

## 알려진 이슈 및 개선 사항

### 현재 제한사항

1. **이미지 소스**: Unsplash 목업만 지원
2. **폰트**: 고정된 3가지 폰트 패밀리
3. **HTML 내보내기**: Mosaic 레이아웃만 완전 지원

### 향후 개선 계획

- [ ] 사용자 이미지 업로드
- [ ] 더 많은 레이아웃 템플릿
- [ ] PDF 내보내기
- [ ] 레이아웃 템플릿 저장/불러오기
- [ ] 드래그 앤 드롭 이미지 재배치
- [ ] 커스텀 폰트 업로드
- [ ] 애니메이션 프리셋

## 문제 해결

### 개발 중 발생한 주요 이슈

#### 1. MIME Type 오류
**문제**: `text/jsx` MIME type 오류
**원인**: Live Server 사용 (Vite 대신)
**해결**: `npm run dev`로 Vite 개발 서버 실행

#### 2. 손상된 App.jsx
**문제**: `useState` 구문 오류
**원인**: 파일 편집 중 손상
**해결**: 완전 재작성

#### 3. GitHub Pages 경로 문제
**문제**: 배포 후 자산 로드 실패
**해결**: `vite.config.js`에 `base: '/editorial-gen/'` 추가

## 코드 스타일

- **들여쓰기**: 4 spaces
- **따옴표**: 작은따옴표 (')
- **세미콜론**: 사용
- **컴포넌트 명명**: PascalCase
- **함수 명명**: camelCase

## 라이선스 및 크레딧

- **이미지**: Unsplash (Mock data)
- **아이콘**: Lucide React
- **폰트**: Google Fonts (Playfair Display, Inter, JetBrains Mono)

---

**마지막 업데이트**: 2024-11-24
**버전**: 1.0.0
**개발**: Claude Code + jakeon32
