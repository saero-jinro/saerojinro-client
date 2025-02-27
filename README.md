# 프로젝트 이름

## Code Convention 📝

### Branch Naming Convention
- `main` : 배포 브랜치
- `dev` : 개발 브랜치
- `feat/{feat-name}` : 새로운 기능 개발 브랜치
- `refactor/{refactor-name}` : 코드 리팩토링 브랜치
- `fix/{bug-name}` : 버그 수정 브랜치
- `hotfix/{hotfix-name}` : 긴급 수정 브랜치

### Commit Message Convention
커밋 메시지는 **타입: 내용** 형식으로 작성합니다.

#### Commit Type
- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `refactor` : 코드 리팩토링 (기능 변경 없음)
- `chore` : 기타 변경사항 (빌드, 패키지 매니저 설정 등)
- `style` : 코드 스타일 수정 (세미콜론 추가, 들여쓰기 등)
- `perf` : 성능 개선

---


## Tech Stacks 📚
**Fe Stack**
- Next.js
- Tailwind css
- Zustand

**Deploy**
- vercel

## Package 📦
- **Next.js**: `15.2.0`
- **React**: `18.2.0`
- **Tailwind CSS**: `^4`

### Development Tools
- **ESLint**: `9.21.0`
- **TypeScript**: `5^`

### ESLint Rules
- 항상 세미콜론(`;`) 사용 강제
- 들여쓰기 2칸, switch 문은 1단계 추가 들여쓰기
- 모든 리액트 함수형 컴포넌트를 화살표 함수(`() => {}`)로 작성해야 함
- 코드 최대 길이 100자로 제한 (Prettier)

