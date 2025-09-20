/**
 * Tailwind CSS 설정 파일
 *
 * 이 파일은 Tailwind CSS의 동작을 정의합니다.
 * NativeWind와 함께 사용하여 React Native에서 Tailwind 클래스를 사용할 수 있게 해줍니다.
 *
 * 주요 설정:
 * - content: Tailwind가 스캔할 파일 경로 (사용되지 않는 CSS 클래스 제거를 위해)
 * - theme: 커스텀 색상, 폰트, 간격 등의 디자인 토큰 정의
 * - plugins: 추가 Tailwind 플러그인들
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind가 CSS 클래스를 찾을 파일 경로들
  // 이 경로에 있는 파일들에서 사용된 클래스만 최종 CSS에 포함됩니다 (Tree Shaking)
  content: [
    "./App.{js,jsx,ts,tsx}", // 메인 App 파일
    "./app/**/*.{js,jsx,ts,tsx}", // app 디렉토리의 모든 파일
    "./components/**/*.{js,jsx,ts,tsx}", // components 디렉토리의 모든 파일
  ],
  theme: {
    // 기본 Tailwind 테마를 확장하여 커스텀 디자인 토큰 추가
    extend: {
      colors: {
        // 프로젝트 전용 커스텀 색상 팔레트
        primary: "#2C2E31", // 다크 배경 - 메인 배경색
        secondary: "#4A90E2", // 포인트 색 - 주요 버튼, 링크 등
        accent: "#50E3C2", // 액센트 - 강조 요소, 호버 상태 등
        danger: "#E94E77", // 경고/빨간색 - 에러, 삭제 버튼 등
        success: "#7ED321", // 성공/녹색 - 성공 메시지, 완료 상태 등
      },
    },
  },
  // 추가 Tailwind 플러그인들 (현재는 사용하지 않음)
  plugins: [],
};
