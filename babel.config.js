/**
 * Babel 설정 파일
 *
 * 이 파일은 JavaScript/TypeScript 코드를 변환하기 위한 Babel 설정을 정의합니다.
 * React Native 프로젝트에서 JSX, ES6+ 문법, 그리고 NativeWind를 사용하기 위해 필요합니다.
 *
 * 주요 설정:
 * - babel-preset-expo: Expo 프로젝트에 최적화된 Babel 프리셋
 * - nativewind/babel: NativeWind CSS 클래스를 React Native 스타일로 변환하는 플러그인
 *
 * 참고: 이 설정이 없으면 className 속성이 작동하지 않습니다.
 */
module.exports = function (api) {
  // Babel 캐시를 활성화하여 빌드 성능 향상
  api.cache(true);
  return {
    // Expo 프로젝트에 최적화된 프리셋 (JSX, ES6+ 문법 지원)
    presets: ["babel-preset-expo"],
    // NativeWind CSS 클래스를 React Native 스타일 객체로 변환하는 플러그인
    // 이 플러그인이 className="flex-1 bg-white" 같은 코드를 실제 스타일로 변환합니다
    plugins: ["nativewind/babel"],
  };
};
