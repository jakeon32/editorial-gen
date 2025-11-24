# Editorial Layout Generator

![Editorial Gen](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-06b6d4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

편집 디자인 레이아웃을 빠르게 프로토타이핑할 수 있는 웹 애플리케이션입니다.

🔗 **Live Demo**: [https://jakeon32.github.io/editorial-gen/](https://jakeon32.github.io/editorial-gen/)

## ✨ 주요 기능

### 레이아웃 타입
- 🎯 **Hero** - 전면 히어로 스타일 (1 이미지)
- 📐 **Split** - 반반 분할 레이아웃 (2 이미지)
- 📋 **Minimal Grid** - 미니멀 그리드 (3-6 이미지)
- 🎨 **Mosaic** - BSP 알고리즘 기반 동적 모자이크 (2-16 이미지)

### 제어 기능
- 🖼️ **Canvas**: 5가지 종횡비 선택 (1:1, 4:3, 3:4, 16:9, 9:16)
- 🎚️ **Parameters**:
  - Structure (0-100): 레이아웃 동적 효과 제어
  - Size (0.5x-1.5x): 콘텐츠 크기 조절
  - Image Count (1-16): 기본 이미지 개수
- 🎨 **Colors**: Accent 및 Background 색상 커스터마이징
- ✍️ **Content**: 제목, 설명, 태그, 부제목 입력 및 요소 토글

### 페이지 관리
- ➕➖ 페이지별 이미지 개수 조절
- 🔄 레이아웃 셔플 (재생성)
- 💾 HTML 파일로 내보내기
- 🗑️ 페이지 삭제

## 🚀 시작하기

### 사전 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/jakeon32/editorial-gen.git
cd editorial-gen

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📸 스크린샷

### 메인 인터페이스
좌측 제어 패널에서 레이아웃 설정을 조절하고, 우측에서 실시간 미리보기를 확인할 수 있습니다.

### 레이아웃 예시
- **Hero Layout**: 전체 화면 이미지 위에 텍스트 오버레이
- **Split Layout**: 이미지와 텍스트의 반반 분할
- **Minimal Grid**: 정돈된 그리드 배치
- **Mosaic Layout**: 동적인 BSP 알고리즘 기반 레이아웃

## 🏗️ 기술 스택

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Icons**: Lucide React 0.554.0
- **Deployment**: GitHub Pages + GitHub Actions

## 📖 사용 방법

### 1. 레이아웃 추가
좌측 하단의 "Add New Layout" 버튼을 클릭하여 새 페이지를 생성합니다.

### 2. 설정 조절
- **Canvas**: 원하는 종횡비 선택
- **Structure**: 슬라이더를 조절하여 이미지 회전/스케일 효과 추가 (0 = 정적, 100 = 매우 동적)
- **Size**: 텍스트 크기 조절
- **Colors**: 액센트 및 배경 색상 변경
- **Content**: 제목, 설명, 태그 등 입력

### 3. 페이지별 조작
각 페이지 카드 상단의 컨트롤로:
- **±**: 이미지 개수 조절 (레이아웃 자동 재조정)
- **🔄**: 레이아웃 및 스타일 재생성
- **💾**: 현재 페이지를 HTML 파일로 다운로드
- **🗑️**: 페이지 삭제

### 4. 내보내기
다운로드 버튼을 클릭하면 독립적인 HTML 파일이 생성됩니다. Tailwind CDN과 Google Fonts를 포함하여 별도의 의존성 없이 바로 사용 가능합니다.

## 🧩 BSP 알고리즘

Mosaic 레이아웃은 **Binary Space Partitioning (BSP)** 알고리즘을 사용합니다:

- 12x12 그리드 기반
- 재귀적 블록 분할
- 전략: 60% 균형 (가장 큰 블록), 40% 대비 (랜덤)
- 분할 비율: 1/2, 1/3, 또는 랜덤
- 콘텐츠 블록 자동 배치 (텍스트용 공간)

자세한 내용은 `src/utils/bspLayout.js` 참조

## 📁 프로젝트 구조

```
editorial-gen/
├── src/
│   ├── App.jsx              # 메인 애플리케이션
│   ├── utils/
│   │   └── bspLayout.js     # BSP 알고리즘
│   ├── main.jsx             # 엔트리 포인트
│   └── index.css            # Tailwind imports
├── public/
│   └── vite.svg
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages 배포
├── vite.config.js
├── tailwind.config.js
├── package.json
├── DEVELOPMENT.md           # 개발 노트
└── README.md
```

## 🛠️ 개발 가이드

개발 관련 상세 내용은 [DEVELOPMENT.md](./DEVELOPMENT.md)를 참조하세요.

### 새 레이아웃 추가하기

1. 레이아웃 컴포넌트 생성:
```javascript
const LayoutCustom = ({ data, images, styles, accentColor, backgroundColor, contentScale }) => {
  // 레이아웃 구현
  return <div>...</div>;
}
```

2. `layoutTypes` 배열에 등록:
```javascript
const layoutTypes = [
  // ...
  { id: 'custom', comp: LayoutCustom, minImages: 1, maxImages: 8 }
];
```

## 🐛 알려진 이슈

현재 제한사항:
- 이미지 소스가 Unsplash 목업으로 고정
- HTML 내보내기가 Mosaic 레이아웃에서만 완전히 지원

## 🗺️ 로드맵

- [ ] 사용자 이미지 업로드
- [ ] 더 많은 레이아웃 템플릿
- [ ] PDF/PNG 내보내기
- [ ] 레이아웃 템플릿 저장/불러오기
- [ ] 드래그 앤 드롭 재배치
- [ ] 커스텀 폰트 업로드

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙏 크레딧

- **이미지**: [Unsplash](https://unsplash.com)
- **아이콘**: [Lucide React](https://lucide.dev)
- **폰트**: Google Fonts (Playfair Display, Inter, JetBrains Mono)

## 📧 연락처

**jakeon32** - [GitHub](https://github.com/jakeon32)

Project Link: [https://github.com/jakeon32/editorial-gen](https://github.com/jakeon32/editorial-gen)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
