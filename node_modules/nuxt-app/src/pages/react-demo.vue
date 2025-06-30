<template>
  <div>
    <h2>React 앱 (App.tsx) 가져오기</h2>
    <div id="react-root" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  if (!window.reactApp) {
    console.error('window.reactApp is undefined!');
    return;
  }

  const container = window.reactApp;

  // 공유 스코프 초기화 필요 (Webpack 기반일 때)
  if (!container.__initialized) {
    await container.init(__webpack_share_scopes__.default);
    container.__initialized = true;
  }
  const App = (await container()).default

  const ReactDOM = await import('react-dom')
  const React = await import('react')

  const root = document.getElementById('react-root')
  if (root) {
    ReactDOM.default.render(React.createElement(App), root)
  }
})
</script>
