# 🍷 Part3 1팀 중급 프로젝트_WINE

## 📖 프로젝트 소개

<h3> 한 곳에서 관리하는 나만의 와인 창고 </h3>
<img width="1140" height="535" alt="image" src="https://github.com/user-attachments/assets/39a9c19f-d0f0-48bf-993d-9367ddffb0bb" />

---

## 🚀 라이브 데모

[https://wine-team1.vercel.app](https://wine-team1.vercel.app/)

---

## ✨ 주요 기능

- 🍷 매달 새롭게 만나는 **와인 추천 콘텐츠**
- 🔎 다양한 필터로 찾는 **맞춤 와인 탐색 기능**
- ⭐ 직관적인 **리뷰·별점 시스템** 제공

---

## 🛠 주요 기능 상세 내용

- **메인 페이지 (`/`)**
    - 🏠 로고 버튼 클릭 → / 페이지로 이동
    - 🔑 로그인 버튼 클릭 → /login 페이지로 이동
    - 📝 회원가입 버튼 클릭 → /signup 페이지로 이동
    - 🍷 와인 보러가기 버튼 클릭 → 와인 목록 페이지(/wines)로 이동
- **와인 목록 페이지 (`/wines`)**
    - 📦 이번 달 추천 와인 및 와인 목록 조회 (GET)
    - 🍇 와인 카드 클릭 → 와인 상세 페이지 (/wines/id)로 이동
- **와인 상세 페이지 (`/wines/id`)**
    - 📑 와인 정보/ 평균 별점/ 리뷰 조회 (GET)
    - 👍 다른 사람이 쓴 리뷰 좋아요 (POST)
    - ✏️ 내가 쓴 리뷰 수정/ 삭제 (PATCH/ DELETE)
    - 📉 리뷰 카드 접기문
- **내 프로필 페이지 (`/myprofile`)**
    - 🖼 프로필 사진 변경 (PATCH)
    - ✍️ 닉네임 수정 (PATCH)
    - 📝 내가 쓴 후기 목록 조회 (GET)
        - ✏️ 후기 수정/삭제 (PATCH/DELETE)
    - 🍾 내가 등록한 와인 목록 조회 (GET)
        - ✏️ 와인 수정/삭제 (PATCH/DELETE)
- **모달 (와인 등록, 와인 필터, 리뷰 등록)**
    1. **와인 등록 모달**
        - 🍇 와인 이름 / 가격 / 원산지 / 타입 / 사진 입력
        - ✅ "와인 등록하기" → 와인 등록 + 상세 페이지 이동
        - ❌ '취소' 버튼, 모달 외부 클릭 → 모달 닫기
    2. **리뷰 남기기 모달**
        - ⭐ 별점 / 후기 / 맛 / 향 입력
        - ✅ "리뷰 남기기" → 리뷰 등록 + 모달 닫기
        - ❌ '취소' 버튼, 모달 외부 클릭 → 모달 닫기
    3. **와인 목록 필터 모달 (태블릿/ 모바일)**
        - 🍷 와인 타입 / 가격 범위 조절 / 평점 등 조건 선택
        - ✅ "필터 적용하기" → 조건별 와인 목록 조회
        - ♻️ '초기화' 버튼 → 초기화
        - ❌ 모달 외부 클릭→ 모달 닫기

---

## 👥 팀원 소개

| 이름 | 역할 |
| --- | --- |
| [김해빈](https://github.com/Kimheabin) | 공용 컴포넌트<br />헤더, 버튼 + 마이페이지 |
| [노준서](https://github.com/Still-Mare) | 공용 컴포넌트<br />칩, 검색, 별점, 라디오<br />+ 리뷰/와인 모달 UI 및 기능 |
| [이승현](https://github.com/sseung30) | 공용 컴포넌트<br />드롭다운, 셀렉트, 태그<br />+ 와인 상세 페이지 |
| [이은서](https://github.com/les0498) | 팀장<br />공용 컴포넌트<br />프로필, 슬라이더, SNS 로그인<br />+ 와인 목록 페이지 |
| [임희우](https://github.com/LHeeW) | 기초 셋업<br />공용 컴포넌트<br />인풋 + 로그인/회원가입/간편로그인 |

---

## 🧰 기술 스택

- ⚡ TypeScript: `5.9.2`
- ⚛️ Next.js: `15.5.2`
- 🌀 swiper: `11.2.10`
- 📚 storybook: `9.1.3`
- 💬 types/kakao-js-sdk: `11.2.10`
- 📑 openapi-typescript: `7.9.1`
- 🔥 Vite: `3.2.4`
- ⚛️ React: `19.1.0`

---

## 📂 폴더 구조

```tsx
├── public
│   └── assets
├── src
│   ├── actions
│   ├── app
│   │   ├── (home)
│   │   ├── fonts
│   │   ├── login
│   │   ├── modal-test
│   │   ├── myprofile
│   │   ├── signup
│   │   ├── wines
│   │   ├── ClientLayout.tsx
│   │   ├── favicon.ico
│   │   ├── fonts.module.css
│   │   ├── globals.css
│   │   ├── layout.module.css
│   │   ├── layout.tsx
│   │   ├── Nav.module.css
│   │   ├── Nav.tsx
│   │   ├── not-found.tsx
│   │   ├── page.module.css
│   │   └── reset.css
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── stories
│   ├── types
│   ├── utils
│   └── middleware.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── vitest.config.ts
└── vitest.shims.d.ts

```

---

## 📜 라이선스

이 프로젝트는 [MIT 라이선스](https://opensource.org/licenses/MIT)를 따릅니다.
