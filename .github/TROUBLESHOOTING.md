# 배포 문제 해결 가이드

## 현재 발생 중인 404 오류

### 증상
```
GET https://jakeon32.github.io/src/main.jsx (404)
GET https://jakeon32.github.io/vite.svg (404)
```

### 원인
경로에 `/editorial-gen/`이 없음 → GitHub Pages가 브랜치에서 직접 배포 중

### 해결 체크리스트

#### ✅ 1. GitHub Pages Source 확인
- [ ] Settings → Pages로 이동
- [ ] Source가 "GitHub Actions"인지 확인
- [ ] "Deploy from a branch"가 아닌지 확인

#### ✅ 2. GitHub Actions 실행 확인
- [ ] Actions 탭으로 이동: https://github.com/jakeon32/editorial-gen/actions
- [ ] "Deploy to GitHub Pages" 워크플로우 찾기
- [ ] 최근 실행된 워크플로우가 성공(✅)했는지 확인

#### ✅ 3. 워크플로우 수동 실행
만약 워크플로우가 자동 실행되지 않았다면:
- [ ] "Deploy to GitHub Pages" 클릭
- [ ] "Run workflow" 버튼 클릭
- [ ] "Run workflow" 확인

#### ✅ 4. 브라우저 캐시 클리어
- [ ] Ctrl + Shift + Delete (Windows/Linux)
- [ ] Cmd + Shift + Delete (Mac)
- [ ] 또는 시크릿/프라이빗 모드로 접속

#### ✅ 5. 권한 확인
- [ ] Settings → Actions → General
- [ ] Workflow permissions: "Read and write permissions" 선택
- [ ] "Allow GitHub Actions to create and approve pull requests" 체크

## 올바른 URL 확인

배포 성공 후 다음 경로들이 정상 작동해야 합니다:
- ✅ https://jakeon32.github.io/editorial-gen/
- ✅ https://jakeon32.github.io/editorial-gen/assets/index-[hash].js
- ✅ https://jakeon32.github.io/editorial-gen/vite.svg

## 배포 확인 방법

1. **Actions 탭에서 확인**
   - 녹색 체크마크 ✅ 확인
   - 빌드 시간: 약 1-2분

2. **개발자 도구로 확인** (F12)
   - Network 탭 열기
   - 페이지 새로고침
   - 모든 리소스가 200 OK인지 확인

3. **직접 접속 테스트**
   - https://jakeon32.github.io/editorial-gen/assets/ (403 또는 파일 목록)
   - https://jakeon32.github.io/editorial-gen/vite.svg (이미지 표시)

## 여전히 안 되는 경우

### 최후의 수단: 강제 재배포

빈 커밋으로 Actions 트리거:
```bash
git commit --allow-empty -m "Force rebuild"
git push origin main
```

그 후 Actions 탭에서 워크플로우 실행 확인

## 연락처

문제가 계속되면 GitHub Issues에 리포트:
https://github.com/jakeon32/editorial-gen/issues
