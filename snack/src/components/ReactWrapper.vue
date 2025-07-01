<template>
  <div ref="reactContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const reactContainer = ref(null)
let reactRoot = null

const props = defineProps({
  remoteModule: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    default: 'default'
  }
})

onMounted(async () => {
  try {
    console.log('Loading module:', props.remoteModule)
    const module = await import(/* @vite-ignore */ props.remoteModule)
    console.log('Module loaded:', module)
    console.log('Available exports:', Object.keys(module))
    
    const Component = module[props.componentName] || module.default
    console.log('Component:', Component)
    
    if (Component) {
      const React = await import('react')
      const ReactDOM = await import('react-dom/client')
      
      reactRoot = ReactDOM.createRoot(reactContainer.value)
      reactRoot.render(React.createElement(Component))
    } else {
      console.error('Component not found:', props.componentName)
    }
  } catch (error) {
    console.error('Failed to load React component:', error)
  }
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>