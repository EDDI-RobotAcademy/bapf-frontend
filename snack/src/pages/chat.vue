<template>
  <div class="chat-container">
    <ReactWrapper
      remote-module="snack_chat_react/ChatApp"
      component-name="default"
    />
  </div>
</template>

<script setup>
import ReactWrapper from '~/components/ReactWrapper.vue'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: '채팅 - 헝글',
  description: '헝글 채팅 서비스'
})
</script>

<style scoped>
.chat-container {
  width: 100%;
  height: calc(100vh - 64px); /* 네비게이션 바 높이 제외 */
  overflow: hidden;
}
</style>
