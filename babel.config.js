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
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // 필요하면 다른 플러그인들을 여기에 추가하세요.
      // 예: ['module-resolver', { alias: { '@components': './src/components' } }],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      // 아래 플러그인은 반드시 "마지막"에 위치해야 합니다.
      "react-native-worklets/plugin",
    ],
  };
};
