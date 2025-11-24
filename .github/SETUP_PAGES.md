# GitHub Pages 설정 가이드

## ⚠️ 중요: 배포 설정 변경 필요

현재 저장소는 **GitHub Actions**를 사용하여 자동 배포되도록 설정되어 있습니다.

### 설정 방법

1. **GitHub 저장소로 이동**
   - https://github.com/jakeon32/editorial-gen

2. **Settings → Pages**
   - 좌측 메뉴에서 "Pages" 클릭

3. **Source 설정 변경**
   - 현재: `Deploy from a branch` (잘못된 설정)
   - 변경: `GitHub Actions` 선택

4. **저장 및 재배포**
   - 설정이 자동 저장됨
   - Actions 탭에서 워크플로우가 실행되는지 확인

### 배포 URL
설정 완료 후 1-2분 뒤:
- https://jakeon32.github.io/editorial-gen/

## 문제 해결

### 404 에러가 발생하는 경우
- Source가 "Deploy from a branch"로 설정되어 있음
- 위 단계대로 "GitHub Actions"로 변경

### Actions 워크플로우가 실행되지 않는 경우
1. Settings → Actions → General
2. Workflow permissions 확인
   - "Read and write permissions" 선택
   - "Allow GitHub Actions to create and approve pull requests" 체크

### 빌드 실패 시
- Actions 탭에서 에러 로그 확인
- Node.js 버전 호환성 확인 (설정: Node 20)
